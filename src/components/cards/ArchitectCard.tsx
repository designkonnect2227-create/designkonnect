import { Link } from "react-router-dom";

export type ArchitectCardProps = {
  slug: string;
  name: string;
  title: string;
  avatar: string;
  location: string;
  experience: string;
};

const ArchitectCard = ({ slug, name, title, avatar, location, experience }: ArchitectCardProps) => {
  return (
    <article className="rounded-lg border border-border bg-card/60 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <img src={avatar} alt={`${name} portrait`} className="h-16 w-16 rounded-full object-cover" loading="lazy" />
        <div>
          <h3 className="text-lg font-semibold leading-tight">{name}</h3>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-xs text-muted-foreground mt-1">{location} • {experience}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Link to={`/architects/${slug}`} className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">View Profile</Link>
        <Link to={`/projects?architect=${slug}`} className="px-4 py-2 rounded-md border border-border text-sm font-medium hover:bg-secondary transition-colors">Projects</Link>
      </div>
    </article>
  );
};

export default ArchitectCard;
