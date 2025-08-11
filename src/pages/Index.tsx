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
      <section className="relative pt-24 pb-20">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-70"
          style={{ backgroundImage: "url('/images/hero-buildings.jpg')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-background/95 via-background/85 to-background/60" aria-hidden="true" />

        <div className="max-w-5xl mx-auto text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Connecting <span className="text-accent">Visionary</span> <span className="text-primary">Architects</span> with
            <br className="hidden md:block" /> Dream Projects
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl">
            DesignKonnect bridges the gap between exceptional architectural talent and clients with ambitious visions. Find your perfect
            architectural match today.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link to="/architects" className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
              Find an Architect
            </Link>
            <Link to="/clients" className="px-6 py-3 rounded-md border border-border font-medium hover:bg-secondary transition-colors">
              Submit Your Project
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-3">
              <img className="h-9 w-9 rounded-full ring-2 ring-background" src="https://i.pravatar.cc/64?img=5" alt="Architect avatar 1" loading="lazy" />
              <img className="h-9 w-9 rounded-full ring-2 ring-background" src="https://i.pravatar.cc/64?img=15" alt="Architect avatar 2" loading="lazy" />
              <img className="h-9 w-9 rounded-full ring-2 ring-background" src="https://i.pravatar.cc/64?img=25" alt="Architect avatar 3" loading="lazy" />
            </div>
            <p className="text-sm text-muted-foreground">250+ Architects ready to bring your vision to life</p>
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
