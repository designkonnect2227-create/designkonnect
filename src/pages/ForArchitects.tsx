import { Helmet } from 'react-helmet-async';
import { toast } from '@/hooks/use-toast';

const ForArchitects = () => {
  const handleClick = (type: 'create' | 'login') => {
    toast({ title: type === 'create' ? 'Create Profile' : 'Login', description: 'Auth will be added next. This is a placeholder action.' });
  };

  return (
    <section className="py-16">
      <Helmet>
        <title>Architects Portal — DesignKonnect</title>
        <meta name="description" content="Create your architect profile on DesignKonnect and connect with clients." />
        <link rel="canonical" href="/architects-portal" />
      </Helmet>
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Architects Portal</h1>
        <p className="text-muted-foreground mb-8">Showcase your portfolio, highlight expertise, and get discovered by clients.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => handleClick('create')} className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">Create Profile</button>
          <button onClick={() => handleClick('login')} className="px-6 py-3 rounded-md border border-border font-medium hover:bg-secondary transition-colors">Login</button>
        </div>
      </div>
    </section>
  );
};

export default ForArchitects;
