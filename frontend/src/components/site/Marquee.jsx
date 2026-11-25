import { Icon } from "./Icon";

const Row = ({ words }) => (
  <div className="flex shrink-0 items-center">
    {words.map((w, i) => (
      <span key={`${w}-${i}`} className="flex items-center">
        <span className={`font-display px-8 text-5xl uppercase sm:text-7xl ${i % 2 ? "text-outline" : "text-white"}`}>{w}</span>
        <Icon name="paw" className="text-2xl text-[color:var(--gold)]" />
      </span>
    ))}
  </div>
);

export const Marquee = ({ words }) => (
  <div data-testid="editorial-marquee" className="relative -rotate-2 border-y border-[color:var(--gold)]/30 bg-[#0d0d11] py-6">
    <div className="animate-marquee flex w-max">
      <Row words={words} />
      <Row words={words} />
    </div>
  </div>
);
