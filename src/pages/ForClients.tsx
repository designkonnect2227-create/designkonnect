import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CategoryFilter from '@/components/filters/CategoryFilter';
import ProjectCard from '@/components/cards/ProjectCard';
import { projects } from '@/data/projects';
import { Link } from 'react-router-dom';
import ArchitectCard from '@/components/cards/ArchitectCard';
import { architects } from '@/data/architects';

const ForClients = () => {
  const categories = Array.from(new Set(projects.map((p) => p.category)));
  const [active, setActive] = useState('All');
  const filtered = useMemo(() => (active === 'All' ? projects : projects.filter((p) => p.category === active)), [active]);

  return (
    <section className="py-10">
      <Helmet>
        <title>Browse Projects & Architects — DesignKonnect</title>
        <meta name="description" content="Explore Indian residential, commercial, cultural and more projects and connect with architects." />
        <link rel="canonical" href="/clients" />
      </Helmet>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Featured Architectural Projects</h1>
        <p className="text-muted-foreground">Discover exceptional projects from our network of talented architects.</p>
        <p className="text-sm text-muted-foreground mt-1">We don’t just build spaces — we deliver experiences that elevate everyday living.</p>
      </div>

      <div className="mb-6">
        <span className="text-sm mr-3 text-muted-foreground">Filter by Project Type:</span>
        <CategoryFilter categories={categories} active={active} onChange={setActive} />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.slice(0, 6).map((p) => (
          <ProjectCard
            key={p.id}
            slug={p.slug}
            title={p.title}
            category={p.category}
            image={p.images[0]}
            architectName={p.architectName}
            architectSlug={p.architectSlug}
            description={p.description}
          />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Link to="/projects" className="px-4 py-2 rounded-md border border-border text-sm font-medium hover:bg-secondary transition-colors">Explore all projects</Link>
      </div>

      <div className="mt-12 border-t border-border/60 pt-8">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold">Meet Our Top Architects</h2>
            <p className="text-muted-foreground">Connect with professionals ready to bring your vision to life.</p>
          </div>
          <Link to="/architects" className="underline underline-offset-4">View all architects</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {architects.slice(0, 6).map((a) => (
            <ArchitectCard key={a.id} slug={a.slug} name={a.name} title={a.title} avatar={a.avatar} location={a.location} experience={a.experience} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForClients;
