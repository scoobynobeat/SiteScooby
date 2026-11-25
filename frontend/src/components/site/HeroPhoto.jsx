import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { Icon } from "./Icon";

const BADGE = "SCOOBY NO BEAT\u00A0•\u00A0SCOOBY NO BEAT\u00A0•\u00A0";

export const HeroPhoto = ({ src, name }) => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 14 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 14 });
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 800], [0, 90]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <div className="relative mx-auto w-full max-w-[440px]" style={{ perspective: 1200 }} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="pointer-events-none absolute -inset-16 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(245,197,24,0.35),transparent_60%)] blur-2xl" />
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] border border-[color:var(--gold)]/30 shadow-[0_40px_120px_-30px_rgba(245,197,24,0.45)]">
          <motion.img
            src={src}
            alt={name}
            data-testid="artist-avatar-img"
            style={{ y: imgY, scale: 1.18 }}
            className="h-full w-full object-cover object-[50%_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>
        <div className="absolute -bottom-8 left-2 h-28 w-28 sm:-left-10 sm:h-32 sm:w-32" style={{ transform: "translateZ(60px)" }}>
          <svg viewBox="0 0 100 100" className="animate-spin-slow h-full w-full">
            <defs><path id="circle" d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0" /></defs>
            <circle cx="50" cy="50" r="49" fill="#F5C518" />
            <text fontFamily="JetBrains Mono" fontSize="9" fontWeight="600" fill="#0A0A0D">
              <textPath href="#circle" textLength="219.5" lengthAdjust="spacing">{BADGE}</textPath>
            </text>
          </svg>
          <Icon name="paw" className="absolute inset-0 m-auto text-2xl text-black" />
        </div>
      </motion.div>
    </div>
  );
};
