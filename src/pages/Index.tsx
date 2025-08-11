import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Index = ({ aboutOnly = false }: { aboutOnly?: boolean }) => {
  if (aboutOnly) {
    return (
      <section className="py-16">
        <Helmet>
          <title>About DesignKonnect</title>
          <meta name="description" content="About DesignKonnect — connecting clients with top architects across India." />
          <link rel="canonical" href="/about" />
        </Helmet>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-muted-foreground">DesignKonnect bridges clients and architects, making it easy to discover exemplary projects and collaborate with the right professionals.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>DesignKonnect — Connect Vision To Architecture Precision</title>
        <meta name="description" content="Explore Indian architecture projects and connect with leading architects on DesignKonnect." />
        <link rel="canonical" href="/" />
      </Helmet>
      <section className="relative py-24">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-buildings.jpg')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background/90 via-background/70 to-background/40" aria-hidden="true" />
        <div className="text-center max-w-3xl mx-auto animate-enter">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img src="/lovable-uploads/bd0a0fee-876a-47b3-8b74-e6ec2838e0b2.png" alt="DesignKonnect logo" className="h-16 w-16" />
            <div>
              <h1 className="text-5xl font-bold tracking-tight">DesignKonnect</h1>
              <p className="text-lg text-muted-foreground">Connect Vision To Architecture Precision</p>
            </div>
          </div>
          <p className="text-muted-foreground mb-8">Discover curated architectural projects across India and connect with the architects behind them.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/clients" className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">I’m a Client</Link>
            <Link to="/architects-portal" className="px-6 py-3 rounded-md border border-border font-medium hover:bg-secondary transition-colors">I’m an Architect</Link>
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-border/60">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border p-6">
            <h2 className="text-2xl font-semibold mb-2">For Clients</h2>
            <p className="text-muted-foreground">Browse projects and discover architects that fit your vision and budget.</p>
            <Link to="/clients" className="mt-4 inline-block underline underline-offset-4">Start exploring →</Link>
          </div>
          <div className="rounded-xl border border-border p-6">
            <h2 className="text-2xl font-semibold mb-2">For Architects</h2>
            <p className="text-muted-foreground">Create your profile, showcase work, and connect with new clients.</p>
            <Link to="/architects-portal" className="mt-4 inline-block underline underline-offset-4">Create profile →</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
