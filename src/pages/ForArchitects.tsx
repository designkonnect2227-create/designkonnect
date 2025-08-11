import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabaseClient';

const ForArchitects = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate('/dashboard');
    });
  }, [navigate]);

  const signIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast({ title: 'Login failed', description: error.message });
    toast({ title: 'Welcome back', description: 'Logged in successfully.' });
    navigate('/dashboard');
  };

  const signUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) return toast({ title: 'Signup failed', description: error.message });
    toast({ title: 'Check your email', description: 'Confirm your email to complete signup.' });
  };

  return (
    <section className="py-16">
      <Helmet>
        <title>Architects Portal — DesignKonnect</title>
        <meta name="description" content="Sign up or log in to manage your architect profile and projects on DesignKonnect." />
        <link rel="canonical" href="/architects-portal" />
      </Helmet>
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Architects Portal</h1>
        <p className="text-muted-foreground mb-8">Create your profile, add projects and manage images after login.</p>
        <div className="grid gap-4 text-left">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" type="email" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" type="password" placeholder="••••••••" />
          </div>
          <div className="flex gap-3 justify-center pt-2">
            <button disabled={loading} onClick={signIn} className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium disabled:opacity-60">{loading ? 'Please wait…' : 'Login'}</button>
            <button disabled={loading} onClick={signUp} className="px-6 py-3 rounded-md border border-border font-medium disabled:opacity-60">Sign up</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForArchitects;
