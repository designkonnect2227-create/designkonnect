import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export type ProjectCardProps = {
  slug: string;
  title: string;
  category: string;
  image: string;
  architectName: string;
  architectSlug: string;
  description: string;
};

const ProjectCard = ({ slug, title, category, image, architectName, architectSlug, description }: ProjectCardProps) => {
  return (
    <article className="rounded-lg border border-border bg-card/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow hover-scale">
      <div className="relative">
        <img src={image} alt={`${title} project image`} className="w-full h-56 object-cover" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }} />
        <Badge className="absolute top-3 right-3" variant="secondary">{category}</Badge>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-2">
          Designed by {" "}
          <Link to={`/architects/${architectSlug}`} className="underline underline-offset-4">
            {architectName}
          </Link>
        </p>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <Link to={`/projects/${slug}`} className="px-4 py-2 rounded-md border border-border text-sm font-medium hover:bg-secondary transition-colors">
            View Project →
          </Link>
          <Link to={`/architects/${architectSlug}`} className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground">Architect</Link>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
