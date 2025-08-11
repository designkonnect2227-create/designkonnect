import { Helmet } from 'react-helmet-async';
import ContactForm from '@/components/forms/ContactForm';

const Contact = () => {
  return (
    <section className="py-12">
      <Helmet>
        <title>Contact — DesignKonnect</title>
        <meta name="description" content="Contact DesignKonnect architects. Send inquiries and collaborations." />
        <link rel="canonical" href="/contact" />
      </Helmet>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Get in touch</h1>
        <p className="text-muted-foreground mb-8">One simple form for clients and architects. We’ll respond within 24 hours.</p>
        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
