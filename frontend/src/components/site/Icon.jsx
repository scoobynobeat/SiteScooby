import ICONS from "@/data/icons.json";

export const Icon = ({ name, className = "" }) => {
  const [viewBox, d] = ICONS[name];
  return (
    <svg viewBox={viewBox} fill="currentColor" aria-hidden="true" className={`inline-block h-[1em] w-[1em] shrink-0 ${className}`}>
      <path d={d} />
    </svg>
  );
};
