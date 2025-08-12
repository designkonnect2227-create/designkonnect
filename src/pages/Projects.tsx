import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import CategoryFilter from '@/components/filters/CategoryFilter';
import ProjectCard from '@/components/cards/ProjectCard';
import { projects } from '@/data/projects';

const Projects = () => {
  const categories = useMemo(() => Array.from(new Set(projects.map((p) => p.category))), []);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialActive = useMemo(() => {
    const param = searchParams.get('category');
    return param && (param === 'All' || categories.includes(param)) ? param : 'All';
  }, [searchParams, categories]);

  const [active, setActive] = useState(initialActive);
  const filtered = useMemo(() => (active === 'All' ? projects : projects.filter((p) => p.category === active)), [active]);
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
        {filtered.map((p) => (
          <ProjectCard key={p.id} slug={p.slug} title={p.title} category={p.category} image={p.images[0]} architectName={p.architectName} architectSlug={p.architectSlug} description={p.description} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
