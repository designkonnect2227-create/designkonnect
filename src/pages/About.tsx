import { Helmet } from 'react-helmet-async';

const About = () => {
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DesignKonnect',
    url: 'https://designkonnect.lovable.app',
    description: 'Platform connecting Indian clients with architects; founded by three college students to organize the industry.',
    founders: [
      { '@type': 'Person', name: 'Krish Bansal' },
      { '@type': 'Person', name: 'Shivanshu Gautam' },
      { '@type': 'Person', name: 'Meenal Agarwal' },
    ],
    sameAs: []
  };

  return (
    <section className="py-16">
      <Helmet>
        <title>About Us — DesignKonnect</title>
        <meta name="description" content="We are three college students on a mission to organize India’s architecture industry and empower architects and clients." />
        <link rel="canonical" href="/about" />
      </Helmet>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />

      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-3">About DesignKonnect</h1>
          <p className="text-muted-foreground">Built by students, for the architecture community across India.</p>
        </header>

        <section className="grid gap-8 md:grid-cols-2">
          <article>
            <h2 className="text-2xl font-semibold mb-2">Our Story</h2>
            <p className="text-muted-foreground">
              Our friend is an architect. Watching the day‑to‑day challenges—scattered portfolios, informal communication, and
              project discovery based on luck—we realized the industry is largely unorganized. We are three college students,
              <strong> Krish Bansal</strong>, <strong> Shivanshu Gautam</strong>, and <strong> Meenal Agarwal</strong>, and we decided to fix this with thoughtful
              product design and engineering.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
            <p className="text-muted-foreground">
              Make architecture collaboration simple: clear profiles, verified work, powerful discovery, and transparent communication—
              so clients find the right architects, and architects can focus on great design.
            </p>
          </article>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-5">
            <h3 className="font-semibold mb-1">Organize</h3>
            <p className="text-sm text-muted-foreground">Structured profiles, projects, and messaging—no more scattered links.</p>
          </div>
          <div className="rounded-lg border p-5">
            <h3 className="font-semibold mb-1">Empower</h3>
            <p className="text-sm text-muted-foreground">Tools for architects to showcase real impact and grow sustainably.</p>
          </div>
          <div className="rounded-lg border p-5">
            <h3 className="font-semibold mb-1">Connect</h3>
            <p className="text-sm text-muted-foreground">Intelligent discovery so clients find the perfect architectural partner.</p>
          </div>
        </section>

        <aside className="mt-10 rounded-lg border p-5 bg-card">
          <p className="text-sm text-muted-foreground">
            Have feedback or want to collaborate? Reach us via the Contact page—we read every message.
          </p>
        </aside>
      </div>
    </section>
  );
};

export default About;
