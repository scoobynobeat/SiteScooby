import { motion } from "framer-motion";
import { RELEASES } from "@/data/fallback";
import { Reveal, SectionLabel } from "./Reveal";

const Release = ({ r, i }) => (
  <motion.a href={r.url} target="_blank" rel="noreferrer" data-testid={`track-release-card-${i}`} whileHover="hover" className="group block">
    <div className="relative aspect-square">
      <motion.div
        variants={{ hover: { x: "22%", rotate: 90 } }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-[4%] rounded-full bg-[repeating-radial-gradient(circle,#111_0,#111_2px,#1c1c1c_3px,#111_4px)]"
      >
        <span className="absolute inset-[34%] rounded-full bg-[color:var(--gold)]" />
      </motion.div>
      <motion.img src={r.cover} alt={r.title} variants={{ hover: { x: "-6%", rotate: -3 } }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="relative h-full w-full rounded-xl object-cover shadow-2xl" />
    </div>
    <h3 className="mt-4 text-base font-semibold leading-tight transition-colors duration-300 group-hover:text-[color:var(--gold)]">{r.title}</h3>
    <p className="font-mono-accent mt-1 text-xs text-zinc-400">{r.meta}</p>
  </motion.a>
);

export const Releases = () => (
  <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <SectionLabel index="03" label="Discografia" />
        <h2 className="font-display mt-5 text-5xl uppercase sm:text-7xl">Lançamentos</h2>
      </div>
    </div>
    <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-6">
      {RELEASES.map((r, i) => (
        <Reveal key={r.title} delay={i * 0.06}><Release r={r} i={i} /></Reveal>
      ))}
    </div>
  </section>
);
