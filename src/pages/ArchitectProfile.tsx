import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { architects } from '@/data/architects';
import { projects } from '@/data/projects';
import { supabase } from '@/lib/supabaseClient';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
type MeetingForm = {
  name: string;
  email: string;
  phone?: string;
  location: string;
  mode: 'In-person' | 'Virtual';
  address?: string;
  datetime: string;
  requirements: string;
};

const ArchitectProfile = () => {
  const { slug } = useParams();
  const architect = architects.find((a) => a.slug === slug);

  if (!architect) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-semibold mb-2">Architect not found</h1>
        <Link to="/architects" className="underline underline-offset-4">Back to architects</Link>
      </div>
    );
  }

  const authored = projects.filter((p) => p.architectSlug === architect.slug);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: architect.name,
    jobTitle: architect.title,
    address: architect.location,
    description: architect.bio,
    image: architect.avatar,
  };

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<MeetingForm>({
    defaultValues: { mode: 'In-person' },
  });
  const { toast } = useToast();

  const onSubmit = async (data: MeetingForm) => {
    // Count previous meetings by email to determine pricing
    const { count, error: countErr } = await supabase
      .from('meeting_requests')
      .select('*', { count: 'exact', head: true })
      .eq('email', data.email);

    if (countErr) {
      toast({ title: 'Unable to schedule right now', description: countErr.message, variant: 'destructive' });
      return;
    }

    const isFree = (count ?? 0) < 3;
    const price = isFree ? 0 : 50;

    const { error } = await supabase.from('meeting_requests').insert({
      architect_slug: architect.slug,
      architect_name: architect.name,
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      requirements: data.requirements,
      location: data.location,
      meeting_mode: data.mode,
      meeting_address: data.address ?? null,
      meeting_datetime: data.datetime,
      status: 'pending',
      is_free: isFree,
      price_inr: price,
    });

    if (error) {
      toast({ title: 'Scheduling failed', description: error.message, variant: 'destructive' });
      return;
    }

    toast({
      title: 'Meeting request sent',
      description: isFree
        ? 'This meeting is free. We will confirm shortly via email.'
        : 'A ₹50 scheduling fee applies. We will share payment details on confirmation.',
    });
    reset();
  };

  return (
    <section className="py-10">
      <Helmet>
        <title>{architect.name} — Architect Profile | DesignKonnect</title>
        <meta name="description" content={architect.bio} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="rounded-lg border border-border p-6 mb-8 grid md:grid-cols-3 gap-6 bg-card/60">
        <div className="flex items-start gap-4 md:col-span-2">
          <img src={architect.avatar} alt={`${architect.name} portrait`} className="h-24 w-24 rounded-full object-cover" />
          <div>
            <h1 className="text-3xl font-bold">{architect.name}</h1>
            <p className="text-muted-foreground">{architect.title} • {architect.location}</p>
            <p className="text-sm text-muted-foreground mt-2">{architect.bio}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {architect.specializations.map((s) => (
                <span key={s} className="px-2 py-1 rounded bg-secondary text-xs">{s}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="p-3 rounded-md border border-border"><span className="text-xs text-muted-foreground">Experience</span><div className="font-semibold">{architect.experience}</div></div>
          <div className="p-3 rounded-md border border-border"><span className="text-xs text-muted-foreground">Rating</span><div className="font-semibold">{architect.rating} / 5</div></div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">Schedule a Meeting</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule a Meeting with {architect.name}</DialogTitle>
                <DialogDescription>
                  Handled by DesignKonnect. First 3 meetings are free; afterwards ₹50 per scheduling.
                </DialogDescription>
              </DialogHeader>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" {...register('name', { required: true })} />
                    {errors.name && <p className="text-xs text-destructive mt-1">Name is required</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register('email', { required: true })} />
                    {errors.email && <p className="text-xs text-destructive mt-1">Email is required</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" {...register('phone')} />
                  </div>
                  <div>
                    <Label htmlFor="location">Project City</Label>
                    <Input id="location" placeholder="e.g., Bengaluru" {...register('location', { required: true })} />
                    {errors.location && <p className="text-xs text-destructive mt-1">City is required</p>}
                  </div>
                  <div>
                    <Label htmlFor="mode">Meeting Mode</Label>
                    <select id="mode" className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" {...register('mode', { required: true })}>
                      <option>In-person</option>
                      <option>Virtual</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="datetime">Preferred Date & Time</Label>
                    <Input id="datetime" type="datetime-local" {...register('datetime', { required: true })} />
                    {errors.datetime && <p className="text-xs text-destructive mt-1">Date & time required</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Project Address / Meeting Place</Label>
                  <Input id="address" placeholder="Street, area, PIN" {...register('address')} />
                </div>

                <div>
                  <Label htmlFor="requirements">Requirements / Brief</Label>
                  <Textarea id="requirements" rows={4} placeholder="Describe your project, scope, budget, etc." {...register('requirements', { required: true })} />
                  {errors.requirements && <p className="text-xs text-destructive mt-1">Please share your requirements</p>}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    By submitting, you agree to DesignKonnect facilitating this meeting.
                  </p>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Scheduling...' : 'Submit Request'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <p className="text-xs text-muted-foreground">
            First 3 meetings free. Afterwards ₹50 per meeting.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-lg border border-border p-5">
          <h2 className="text-xl font-semibold mb-2">Education</h2>
          <ul className="list-disc pl-5 text-muted-foreground">
            {architect.education.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-border p-5">
          <h2 className="text-xl font-semibold mb-2">Awards & Recognition</h2>
          <ul className="list-disc pl-5 text-muted-foreground">
            {architect.awards.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-3">Projects by {architect.name}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authored.map((p) => (
            <Link key={p.id} to={`/projects/${p.slug}`} className="rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow">
              <img src={p.images[0]} alt={`${p.title} image`} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="text-xs text-muted-foreground mb-1">{p.category}</div>
                <div className="font-semibold">{p.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchitectProfile;
