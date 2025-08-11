import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { projects } from '@/data/projects';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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

  const ep: any = project as any;
  const features: string[] = ep.features ?? ep.specialties ?? ["Cross ventilation", "Rainwater harvesting", "Daylighting", "Smart controls"];
  const materials: string[] = ep.materials ?? ["Reinforced concrete frame", "Local stone cladding", "Recycled steel", "Low-VOC finishes"];
  const environment: string[] = ep.environment ?? ["Rainwater harvesting", "Greywater reuse", "Solar shading", "Native planting"];
  const energy: string[] = ep.energy ?? ["LED lighting", "High-performance glazing", "Solar PV ready", "Efficient HVAC zoning"];
  const designApproach: string = ep.designApproach ?? "The design emphasizes climate-responsiveness, contextual materials, and user-centric planning with clear circulation and light-filled spaces.";
  const challenges: string = ep.challenges ?? "Site constraints, budget optimization, and approvals were addressed through iterative design and stakeholder collaboration.";
  const timeline: { phase: string; items: string[] }[] = ep.timeline ?? [
    { phase: "Initial Design & Approval", items: ["Concept and massing", "Regulatory approvals"] },
    { phase: "Foundation Work", items: ["Excavation and piling"] },
    { phase: "Core Construction", items: ["Structure and services installation"] },
    { phase: "Facade Installation", items: ["Envelope and glazing systems"] },
    { phase: "Interiors & Handover", items: ["Finishes, testing, commissioning"] },
  ];
  const has3D: boolean = ep.has3D ?? true;

  return (
    <section className="py-10">
      <Helmet>
        <title>{project.title} — DesignKonnect</title>
        <meta name="description" content={project.description} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      {/* Hero Image */}
      <div className="mb-6 relative">
        <AspectRatio ratio={16/9}>
          <img
            src={project.images[0]}
            alt={`${project.title} hero image`}
            className="w-full h-full object-cover rounded-md border"
            loading="eager"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
          />
        </AspectRatio>
        <span className="absolute top-3 right-3 px-2 py-1 rounded bg-secondary text-xs border border-border">{project.category}</span>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs text-muted-foreground">{project.location}</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">{project.title}</h1>
        <p className="text-muted-foreground">Designed by <Link to={`/architects/${project.architectSlug}`} className="underline underline-offset-4">{project.architectName}</Link></p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <p className="text-muted-foreground">{project.description}</p>
      </div>

      <h2 className="text-xl font-semibold mb-3">Project Gallery</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {project.images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${project.title} image ${i + 1}`}
            className="w-full h-64 md:h-80 object-cover rounded-md"
            loading="lazy"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
          />
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 rounded-md border border-border bg-card/60">
          <h3 className="text-lg font-semibold mb-2">Project Details</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li><span className="font-medium text-foreground">Location:</span> {project.location}</li>
            <li><span className="font-medium text-foreground">Year:</span> {project.year}</li>
            <li><span className="font-medium text-foreground">Area:</span> {project.area}</li>
            <li><span className="font-medium text-foreground">Budget:</span> {project.budget}</li>
            <li><span className="font-medium text-foreground">Duration:</span> {project.duration}</li>
            <li><span className="font-medium text-foreground">Category:</span> {project.category}</li>
          </ul>
        </div>
        <div className="p-4 rounded-md border border-border bg-card/60">
          <h3 className="text-lg font-semibold mb-2">Features</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground">
            {features.map((f: string) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Materials Used</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground">
            {materials.map((m: string) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Environmental Considerations</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground">
            {environment.map((e: string) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Design Approach</h3>
          <p className="text-muted-foreground">{designApproach}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Challenges Overcome</h3>
          <p className="text-muted-foreground">{challenges}</p>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-3">Project Timeline</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {timeline.map((t) => (
            <div key={t.phase} className="p-4 rounded-md border border-border bg-card/60">
              <div className="text-sm font-medium mb-2">{t.phase}</div>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                {t.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">3D Elevations</h3>
        <AspectRatio ratio={16/9}>
          <div className="w-full h-full rounded-md border border-dashed border-border bg-muted/20 flex items-center justify-center text-sm text-muted-foreground">
            3D Elevation Placeholder — Upload coming soon
          </div>
        </AspectRatio>
      </div>
    </section>
  );
};

export default ProjectDetail;
