import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ProjectCard from '@/components/cards/ProjectCard';
import ArchitectCard from '@/components/cards/ArchitectCard';
import { projects } from '@/data/projects';
import { architects } from '@/data/architects';

const Client = () => {
  const topProjects = projects.slice(0, 4);
  const topArchitects = architects.slice(0, 4);

  return (
    <section className="py-10">
      <Helmet>
        <title>Client — Explore Projects & Architects | DesignKonnect</title>
        <meta name="description" content="A quick peek at featured projects and architects. Explore more or submit your project on DesignKonnect." />
        <link rel="canonical" href="/client" />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore Highlights</h1>
        <p className="text-muted-foreground">A quick look at a few projects and architects. Dive deeper anytime.</p>
      </div>

      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-semibold">Projects</h2>
          <Link to="/projects" className="underline underline-offset-4">See all projects →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topProjects.map((p) => (
            <ProjectCard key={p.id} slug={p.slug} title={p.title} category={p.category} image={p.images[0]} architectName={p.architectName} architectSlug={p.architectSlug} description={p.description} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-semibold">Architects</h2>
          <Link to="/architects" className="underline underline-offset-4">See all architects →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topArchitects.map((a) => (
            <ArchitectCard key={a.id} slug={a.slug} name={a.name} title={a.title} avatar={a.avatar} location={a.location} experience={a.experience} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Client;
