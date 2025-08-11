import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';

type FormValues = {
  name: string;
  email: string;
  phone?: string;
  type: 'Client Inquiry' | 'Architect Collaboration' | 'General';
  subject?: string;
  message: string;
};

const ContactForm = () => {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormValues>({
    defaultValues: { type: 'Client Inquiry' },
  });

  const onSubmit = async (values: FormValues) => {
    const { error } = await supabase.from('contact_requests').insert({
      name: values.name,
      email: values.email,
      phone: values.phone ?? null,
      type: values.type,
      subject: values.subject ?? null,
      message: values.message,
      source_path: window.location.pathname,
    });
    if (error) {
      toast({ title: 'Could not send message', description: error.message });
    } else {
      toast({ title: 'Message sent', description: 'Thanks! We will get back to you soon.' });
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Full name</label>
          <Input placeholder="Your name" {...register('name', { required: true })} />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <Input type="email" placeholder="you@example.com" {...register('email', { required: true })} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Phone</label>
          <Input type="tel" placeholder="Optional" {...register('phone')} />
        </div>
        <div>
          <label className="block text-sm mb-1">I am contacting as</label>
          <select className="h-10 rounded-md border border-input bg-background px-3 text-sm" {...register('type')}> 
            <option>Client Inquiry</option>
            <option>Architect Collaboration</option>
            <option>General</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm mb-1">Subject</label>
        <Input placeholder="How can we help?" {...register('subject')} />
      </div>
      <div>
        <label className="block text-sm mb-1">Message</label>
        <Textarea rows={6} placeholder="Write your message" {...register('message', { required: true })} />
      </div>
      <div className="flex gap-3">
        <button disabled={isSubmitting} className="px-5 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium disabled:opacity-60">
          {isSubmitting ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
