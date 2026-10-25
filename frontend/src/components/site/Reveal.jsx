import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0.35, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.9, delay, ease }}
  >
    {children}
  </motion.div>
);

const lineVariants = { hidden: { y: "105%" }, show: { y: "0%" } };

export const MaskLine = ({ children, delay = 0, className = "", inView = false }) => {
  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, amount: 0 } }
    : { animate: "show" };
  return (
    <motion.span className="-mt-[0.15em] block overflow-hidden pb-[0.06em] pt-[0.15em]" initial="hidden" {...trigger}>
      <motion.span className={`block ${className}`} variants={lineVariants} transition={{ duration: 1.1, delay, ease }}>
        {children}
      </motion.span>
    </motion.span>
  );
};

export const SectionLabel = ({ index, label }) => (
  <div className="font-mono-accent flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-zinc-400">
    <span className="text-[color:var(--gold)]">{index}</span>
    <span className="h-px w-10 bg-zinc-700" />
    <span>{label}</span>
  </div>
);
