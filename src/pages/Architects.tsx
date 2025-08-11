import { Helmet } from 'react-helmet-async';
import ArchitectCard from '@/components/cards/ArchitectCard';
import { architects } from '@/data/architects';
import { projects } from '@/data/projects';
import { useState } from 'react';

const Architects = () => {
  const cities = Array.from(new Set(architects.map((a) => a.location.split(',')[0].trim())));
  const specializations = Array.from(new Set(architects.flatMap((a) => (a.specializations?.[0] ? [a.specializations[0]] : []))));
  const projectTypes = Array.from(new Set(projects.map((p) => p.category)));
  const budgetRanges = ['All', 'Under ₹5 Cr', '₹5–₹25 Cr', '₹25–₹75 Cr', '₹75+ Cr'];

  const [city, setCity] = useState<string>('All');
  const [spec, setSpec] = useState<string>('All');
  const [minExp, setMinExp] = useState<number>(0);
  const [type, setType] = useState<string>('All');
  const [budget, setBudget] = useState<string>('All');

  const parseBudgetToCr = (value: string) => {
    const clean = value.replace(/[₹,\s]/g, '').toLowerCase();
    if (clean.endsWith('cr')) return parseFloat(clean.replace('cr', ''));
    if (clean.endsWith('l')) return parseFloat(clean.replace('l', '')) / 100; // Lakhs to Crores
    const num = parseFloat(clean);
    return isNaN(num) ? 0 : num / 10000000; // fallback: rupees to crores
  };

  const filtered = architects.filter((a) => {
    const aCity = a.location.split(',')[0].trim();
    const years = parseInt(a.experience);
    const matchCity = city === 'All' || aCity === city;
    const matchSpec = spec === 'All' || a.specializations.includes(spec);
    const matchExp = isNaN(years) ? true : years >= minExp;

    const aps = projects.filter((p) => p.architectSlug === a.slug);
    const matchType = type === 'All' || aps.some((p) => p.category === type);
    const matchBudget =
      budget === 'All' ||
      aps.some((p) => {
        const cr = parseBudgetToCr(p.budget);
        if (budget === 'Under ₹5 Cr') return cr < 5;
        if (budget === '₹5–₹25 Cr') return cr >= 5 && cr < 25;
        if (budget === '₹25–₹75 Cr') return cr >= 25 && cr < 75;
        if (budget === '₹75+ Cr') return cr >= 75;
        return true;
      });

    return matchCity && matchSpec && matchExp && matchType && matchBudget;
  });

  return (
    <section className="py-10">
      <Helmet>
        <title>Architects — DesignKonnect</title>
        <meta name="description" content="Meet exceptional architects across India. Filter by city, specialization and experience." />
        <link rel="canonical" href="/architects" />
      </Helmet>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Our Exceptional Architects</h1>
        <p className="text-muted-foreground">Meet talented professionals ready to bring your vision to life.</p>
      </div>

      <div className="grid gap-3 mb-6 md:grid-cols-5">
        <div>
          <label className="block text-sm mb-1">City</label>
          <select value={city} onChange={(e) => setCity(e.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
            <option>All</option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Specialization</label>
          <select value={spec} onChange={(e) => setSpec(e.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
            <option>All</option>
            {specializations.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Project Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
            <option>All</option>
            {projectTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Budget</label>
          <select value={budget} onChange={(e) => setBudget(e.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
            {budgetRanges.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Min experience (years)</label>
          <input type="number" min={0} value={minExp} onChange={(e) => setMinExp(Number(e.target.value))} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((a) => (
          <ArchitectCard key={a.id} slug={a.slug} name={a.name} title={a.title} avatar={a.avatar} location={a.location} experience={a.experience} />
        ))}
      </div>
    </section>
  );
};

export default Architects;
