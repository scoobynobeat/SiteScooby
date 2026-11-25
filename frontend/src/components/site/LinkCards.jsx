import { motion } from "framer-motion";
import { Icon } from "./Icon";
import { Reveal, SectionLabel, MaskLine } from "./Reveal";

const spanFor = (i, total) => {
  if (i === 0) return "sm:col-span-2 sm:aspect-[21/9]";
  const restOdd = (total - 1) % 2 === 1;
  return i === total - 1 && restOdd ? "sm:col-span-2 sm:aspect-[21/9]" : "";
};

const Card = ({ link, i, total }) => (
  <motion.a
    href={link.url}
    target="_blank"
    rel="noreferrer"
    data-testid={`link-card-item-${i}`}
    whileHover="hover"
    whileTap={{ scale: 0.98 }}
    className={`group relative block aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-900 ${spanFor(i, total)}`}
  >
    <motion.img src={link.image || "/artist.webp"} alt={link.title} loading="lazy" decoding="async" variants={{ hover: { scale: 1.08 } }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/5" />
    <div className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-black/60 text-lg backdrop-blur-xl">
      <Icon name={link.icon} />
    </div>
    <span className="font-mono-accent absolute right-6 top-6 text-xs text-zinc-300">{String(i + 1).padStart(2, "0")}</span>
    <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 sm:inset-x-7 sm:bottom-7">
      <div>
        <h3 className="font-display text-3xl uppercase leading-none sm:text-4xl">{link.title}</h3>
        {link.subtitle && <p className="mt-2 text-sm text-zinc-300">{link.subtitle}</p>}
      </div>
      <motion.span variants={{ hover: { rotate: -45, backgroundColor: "#F5C518", color: "#0A0A0D" } }} className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/30 text-white">
        <Icon name="arrow-right" />
      </motion.span>
    </div>
  </motion.a>
);

export const LinkCards = ({ links }) => {
  const items = Array.isArray(links) ? links : [];
  return (
    <section id="links" className="mx-auto max-w-5xl px-5 py-28 sm:px-8">
      <SectionLabel index="01" label="Links oficiais" />
      <h2 className="font-display mt-5 text-5xl uppercase leading-[0.95] sm:text-7xl">
        <MaskLine inView>O que você</MaskLine>
        <MaskLine inView delay={0.1} className="text-[color:var(--gold)]">procura :)</MaskLine>
      </h2>
      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        {items.map((l, i) => (
          <Reveal key={l.id || i} delay={(i % 2) * 0.08} className={spanFor(i, items.length).includes("col-span-2") ? "sm:col-span-2" : ""}>
            <Card link={l} i={i} total={items.length} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};
