import { motion } from "framer-motion";
import { Icon } from "./Icon";

const KEYS = ["spotify", "instagram", "youtube", "tiktok"];

export const SocialRow = ({ profile }) => {
  const socials = profile?.socials ?? {};
  return (
    <div className="flex flex-wrap gap-3">
      {KEYS.filter((k) => socials[k]).map((k, i) => (
        <motion.a
          key={k}
          href={socials[k]}
          target="_blank"
          rel="noreferrer"
          aria-label={k}
          data-testid={`social-link-${k}`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1 + i * 0.08, type: "spring", stiffness: 260, damping: 18 }}
          whileHover={{ y: -4, rotate: -6 }}
          whileTap={{ scale: 0.92 }}
          className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/5 text-lg backdrop-blur-xl transition-colors duration-300 hover:border-[color:var(--gold)] hover:bg-[color:var(--gold)] hover:text-black"
        >
          <Icon name={k} />
        </motion.a>
      ))}
    </div>
  );
};
