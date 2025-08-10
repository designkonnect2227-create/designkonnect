import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { projects } from '@/data/projects';

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="p-4 rounded-md border border-border bg-card/60">
    <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
    <div className="text-lg font-semibold">{value}</div>
  </div>
);

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-semibold mb-2">Project not found</h1>
        <Link to="/projects" className="underline underline-offset-4">Back to projects</Link>
      </div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Project',
    name: project.title,
    description: project.description,
    locationCreated: project.location,
    creator: {
      '@type': 'Person',
      name: project.architectName,
      url: `/architects/${project.architectSlug}`,
    },
    image: project.images[0],
  };

  return (
    <section className="py-10">
      <Helmet>
        <title>{project.title} — DesignKonnect</title>
        <meta name="description" content={project.description} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-2 py-1 rounded bg-secondary text-xs">{project.category}</span>
          <span className="text-xs text-muted-foreground">{project.location}</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">{project.title}</h1>
        <p className="text-muted-foreground">Designed by <Link to={`/architects/${project.architectSlug}`} className="underline underline-offset-4">{project.architectName}</Link></p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {project.images.map((src, i) => (
          <img key={i} src={src} alt={`${project.title} image ${i + 1}`} className="w-full h-64 md:h-80 object-cover rounded-md" loading="lazy" />
        ))}
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Stat label="Area" value={project.area} />
        <Stat label="Budget" value={project.budget} />
        <Stat label="Timeline" value={project.duration} />
        <Stat label="Year" value={project.year} />
      </div>

      <article className="prose prose-invert max-w-none">
        <p>{project.description}</p>
        <h3>Specialities</h3>
        <ul>
          {project.specialties.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </article>
    </section>
  );
};

export default ProjectDetail;
