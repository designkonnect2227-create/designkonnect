import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<null | Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session']>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (!data.session) navigate('/architects-portal');
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, s) => {
      setSession(s);
      if (!s) navigate('/architects-portal');
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Residential');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const canSubmit = useMemo(() => title && location && description, [title, location, description]);

  const handleCreate = async () => {
    if (!session) return;
    setSaving(true);
    let imageUrl: string | null = null;

    try {
      if (imageFile) {
        const path = `${session.user.id}/${Date.now()}_${imageFile.name}`;
        const { error: upErr } = await supabase.storage.from('projects').upload(path, imageFile, { upsert: false });
        if (upErr) throw upErr;
        const { data } = supabase.storage.from('projects').getPublicUrl(path);
        imageUrl = data.publicUrl;
      }

      const { error: insErr } = await supabase.from('projects').insert({
        title,
        category,
        location,
        description,
        user_id: session.user.id,
        cover_image: imageUrl,
      });
      if (insErr) throw insErr;
      toast({ title: 'Project added', description: 'Your project was saved.' });
      setTitle(''); setLocation(''); setDescription(''); setImageFile(null);
    } catch (e: any) {
      toast({ title: 'Could not save project', description: e.message ?? 'Check storage bucket "projects" and DB table permissions.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="py-12">
      <Helmet>
        <title>Dashboard — DesignKonnect</title>
        <meta name="description" content="Manage your architect profile and projects." />
        <link rel="canonical" href="/dashboard" />
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-8">Add new projects and manage your portfolio.</p>

        <div className="grid gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Project title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" placeholder="Eg. Courtyard House" />
            </div>
            <div>
              <label className="block text-sm mb-1">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                <option>Residential</option>
                <option>Commercial</option>
                <option>Hospitality</option>
                <option>Healthcare</option>
                <option>Education</option>
                <option>Public Space</option>
                <option>Cultural</option>
                <option>Retail</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Location</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" placeholder="City, State" />
          </div>
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Tell us about the concept, materials, and approach" />
          </div>
          <div>
            <label className="block text-sm mb-1">Cover image</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} />
            <p className="text-xs text-muted-foreground mt-1">Uploads to Supabase storage bucket "projects".</p>
          </div>
          <div>
            <button disabled={!canSubmit || saving} onClick={handleCreate} className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium disabled:opacity-60">
              {saving ? 'Saving…' : 'Add Project'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
