import { motion } from "framer-motion";
import { MaskLine, SectionLabel } from "./Reveal";
import { whatsappHref } from "@/lib/api";

export const BookingCTA = ({ profile }) => (
  <section id="shows" className="relative mx-auto max-w-7xl overflow-hidden px-5 py-28 sm:px-8">
    <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--gold)]/25 bg-[#111014] px-6 py-16 sm:px-14 sm:py-24">
      <img src="/artist.jpg" alt="" className="absolute right-0 top-0 h-full w-full object-cover opacity-20 grayscale sm:w-1/2" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#111014] via-[#111014]/90 to-transparent" />
      <div className="relative">
        <SectionLabel index="04" label="Shows & eventos" />
        <h2 className="font-display mt-6 text-5xl uppercase leading-[0.92] sm:text-7xl lg:text-8xl">
          <MaskLine inView>Scooby</MaskLine>
          <MaskLine inView delay={0.1}>no seu <span className="text-[color:var(--gold)]">evento</span></MaskLine>
        </h2>
        <p className="mt-6 max-w-md text-zinc-300">Casas de Shows e eventos. Chama no WhatsApp e garante a data.</p>
        <motion.a
          href={whatsappHref(profile)}
          target="_blank"
          rel="noreferrer"
          data-testid="whatsapp-booking-cta-btn"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 inline-flex items-center gap-4 rounded-full bg-[#25D366] py-3 pl-3 pr-8 text-lg font-semibold text-black"
        >
          <span className="grid h-12 w-12 place-items-center rounded-full bg-black text-2xl text-[#25D366]"><i className="fa-brands fa-whatsapp" /></span>
          Contratar pelo WhatsApp
        </motion.a>
      </div>
    </div>
  </section>
);
