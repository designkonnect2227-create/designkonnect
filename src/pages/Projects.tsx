import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams, Link } from 'react-router-dom';
import CategoryFilter from '@/components/filters/CategoryFilter';
import ProjectCard from '@/components/cards/ProjectCard';
import { projects } from '@/data/projects';
import ArchitectCard from '@/components/cards/ArchitectCard';
import { architects } from '@/data/architects';

const Projects = () => {
  const categories = useMemo(() => Array.from(new Set(projects.map((p) => p.category))), []);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialActive = useMemo(() => {
    const param = searchParams.get('category');
    return param && (param === 'All' || categories.includes(param)) ? param : 'All';
  }, [searchParams, categories]);

  const [active, setActive] = useState(initialActive);
  const filtered = useMemo(() => (active === 'All' ? projects : projects.filter((p) => p.category === active)), [active]);
  const viewAll = searchParams.get('view') === 'all';
  const displayedProjects = useMemo(() => (viewAll ? filtered : filtered.slice(0, 4)), [filtered, viewAll]);
  const featuredArchitects = useMemo(() => architects.slice(0, 4), []);

  useEffect(() => {
    if (active === 'All') {
      if (searchParams.get('category')) setSearchParams({});
    } else if (searchParams.get('category') !== active) {
      setSearchParams({ category: active });
    }
  }, [active, searchParams, setSearchParams]);

  return (
    <section className="py-10">
      <Helmet>
        <title>Projects — DesignKonnect</title>
        <meta name="description" content="Browse residential, commercial, cultural, healthcare, hospitality and more projects across India." />
        <link rel="canonical" href="/projects" />
      </Helmet>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Projects</h1>
        <p className="text-muted-foreground">Explore by category and discover project details.</p>
      </div>
      <div className="mb-6">
        <CategoryFilter categories={categories} active={active} onChange={setActive} />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProjects.map((p) => (
          <ProjectCard key={p.id} slug={p.slug} title={p.title} category={p.category} image={p.images[0]} architectName={p.architectName} architectSlug={p.architectSlug} description={p.description} />
        ))}
      </div>
      {!viewAll && (
        <div className="mt-6 text-right">
          <Link to={active === 'All' ? '/projects?view=all' : `/projects?category=${encodeURIComponent(active)}&view=all`} className="underline underline-offset-4">
            See all projects →
          </Link>
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-2">Featured Architects</h2>
        <p className="text-muted-foreground mb-4">A few architects you might like to work with.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArchitects.map((a) => (
            <ArchitectCard key={a.id} slug={a.slug} name={a.name} title={a.title} avatar={a.avatar} location={a.location} experience={a.experience} />
          ))}
        </div>
        <div className="mt-6 text-right">
          <Link to="/architects" className="underline underline-offset-4">See all architects →</Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
