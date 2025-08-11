import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

const Footer = () => {
  const year = new Date().getFullYear();
  const categories = Array.from(new Set(projects.map((p) => p.category)));

  return (
    <footer className="border-t border-border/60 mt-16 bg-card/40 backdrop-blur">
      <div className="container mx-auto py-10 grid gap-8 md:grid-cols-3">
        <div>
          <Link to="/" className="font-bold text-lg">
            DesignKonnect
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">Connect Vision To Architecture Precision</p>
          <div className="mt-4 text-sm">
            <span className="text-muted-foreground">Email: </span>
            <a href="mailto:designkonnect2227@gmail.com" className="underline underline-offset-4">designkonnect2227@gmail.com</a>
          </div>
        </div>

        <nav aria-label="Quick Links" className="grid sm:grid-cols-2 md:grid-cols-1 gap-2">
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
            <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
            <li><Link to="/projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</Link></li>
            <li><Link to="/architects" className="text-muted-foreground hover:text-foreground transition-colors">Architects</Link></li>
            <li><Link to="/clients" className="text-muted-foreground hover:text-foreground transition-colors">For Clients</Link></li>
            <li><Link to="/architects-portal" className="text-muted-foreground hover:text-foreground transition-colors">For Architects</Link></li>
          </ul>
        </nav>

        <nav aria-label="Project Categories">
          <h3 className="font-semibold mb-2">Project Categories</h3>
          <ul className="grid grid-cols-2 gap-2 text-sm md:block md:space-y-2">
            {categories.map((c) => (
              <li key={c}>
                <Link to={`/projects?category=${encodeURIComponent(c)}`} className="text-muted-foreground hover:text-foreground transition-colors">
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border/60">
        <div className="container mx-auto py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div>© {year} DesignKonnect. All rights reserved.</div>
          <div className="md:text-right">Made with care for architecture.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
