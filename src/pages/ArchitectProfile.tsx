import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { architects } from '@/data/architects';
import { projects } from '@/data/projects';

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
        <div className="space-y-2">
          <div className="p-3 rounded-md border border-border"><span className="text-xs text-muted-foreground">Experience</span><div className="font-semibold">{architect.experience}</div></div>
          <div className="p-3 rounded-md border border-border"><span className="text-xs text-muted-foreground">Rating</span><div className="font-semibold">{architect.rating} / 5</div></div>
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
