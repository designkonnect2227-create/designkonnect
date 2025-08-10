type CategoryFilterProps = {
  categories: string[];
  active: string;
  onChange: (c: string) => void;
};

const CategoryFilter = ({ categories, active, onChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {['All', ...categories].map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
            active === c ? 'bg-primary text-primary-foreground border-transparent' : 'border-border text-muted-foreground hover:bg-secondary'
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
