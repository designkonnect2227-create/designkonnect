import { Link, NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
  }`;

const Header = () => {
  return (
    <header className="border-b border-border/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/lovable-uploads/bd0a0fee-876a-47b3-8b74-e6ec2838e0b2.png"
            alt="DesignKonnect logo"
            className="h-10 w-10 object-contain"
            loading="lazy"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-semibold tracking-tight">DesignKonnect</span>
            <span className="text-xs text-muted-foreground">Connect Vision To Architecture Precision</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/projects" className={navLinkClass}>
            Projects
          </NavLink>
          <NavLink to="/architects" className={navLinkClass}>
            Architects
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About Us
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/clients" className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            For Clients
          </Link>
          <Link to="/architects-portal" className="px-4 py-2 rounded-md border border-border text-sm font-medium hover:bg-secondary transition-colors">
            Architect Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
