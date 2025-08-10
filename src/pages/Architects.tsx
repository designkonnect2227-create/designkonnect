import { Helmet } from 'react-helmet-async';
import ArchitectCard from '@/components/cards/ArchitectCard';
import { architects } from '@/data/architects';

const Architects = () => {
  return (
    <section className="py-10">
      <Helmet>
        <title>Architects — DesignKonnect</title>
        <meta name="description" content="Meet exceptional architects across India. View their profiles and projects on DesignKonnect." />
        <link rel="canonical" href="/architects" />
      </Helmet>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Our Exceptional Architects</h1>
        <p className="text-muted-foreground">Meet talented professionals ready to bring your vision to life.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {architects.map((a) => (
          <ArchitectCard key={a.id} slug={a.slug} name={a.name} title={a.title} avatar={a.avatar} location={a.location} experience={a.experience} />
        ))}
      </div>
    </section>
  );
};

export default Architects;
