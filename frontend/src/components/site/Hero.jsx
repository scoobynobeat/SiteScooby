import { motion } from "framer-motion";
import { MaskLine } from "./Reveal";
import { HeroPhoto } from "./HeroPhoto";
import { SocialRow } from "./SocialRow";
import { whatsappHref } from "@/data/fallback";

const fade = (delay) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay } });

export const Hero = ({ profile }) => {
  const [first, ...rest] = (profile?.name || "").split(" ");
  return (
    <section id="topo" className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-28 sm:px-8 lg:grid-cols-12 lg:pt-36">
      <div className="order-2 lg:order-1 lg:col-span-7">
        <motion.div {...fade(0.2)} className="font-mono-accent mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-zinc-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#1DB954]" />
          Artista oficial · {profile?.tagline}
        </motion.div>
        <h1 data-testid="artist-name-title" className="font-display text-[22vw] uppercase leading-[0.86] sm:text-[8.5rem] lg:text-[9.5rem]">
          <MaskLine delay={0.3}>{first}</MaskLine>
          <MaskLine delay={0.45} className="text-outline">{rest.join(" ")}</MaskLine>
        </h1>
        <motion.div {...fade(0.9)} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <span data-testid="artist-handle-tag" className="text-lg text-zinc-200">{profile?.handle}</span>
          <span data-testid="artist-verified-badge" className="flex items-center gap-1.5 rounded-full bg-[color:var(--gold)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--gold)]">
            <i className="fa-solid fa-circle-check" /> Verificado
          </span>
        </motion.div>
        <motion.p {...fade(1)} className="mt-6 max-w-md text-base text-zinc-300 sm:text-lg">{profile?.bio}</motion.p>
        <div className="mt-8"><SocialRow profile={profile} /></div>
        <motion.div {...fade(1.3)} className="mt-10 flex flex-wrap gap-3">
          <a href="#ouvir" data-testid="hero-listen-btn" className="group flex flex-1 items-center justify-center gap-3 whitespace-nowrap rounded-full sm:flex-none bg-[color:var(--gold)] px-6 py-4 font-semibold text-black transition-transform duration-300 hover:-translate-y-1">
            <i className="fa-solid fa-play" /> Ouvir agora
          </a>
          <a href={whatsappHref(profile)} target="_blank" rel="noreferrer" data-testid="hero-booking-btn" className="flex flex-1 items-center justify-center gap-3 whitespace-nowrap rounded-full border border-white/20 px-6 py-4 sm:flex-none font-semibold transition-colors duration-300 hover:border-[#25D366] hover:text-[#25D366]">
            <i className="fa-brands fa-whatsapp" /> {profile?.booking_label || "Contratar show"}
          </a>
        </motion.div>
      </div>
      <div className="order-1 lg:order-2 lg:col-span-5">
        <HeroPhoto src={profile?.avatar || "/artist.webp"} name={profile?.name} />
      </div>
    </section>
  );
};
