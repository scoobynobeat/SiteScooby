import { Reveal, SectionLabel, MaskLine } from "./Reveal";
import { whatsappHref } from "@/lib/api";

const today = () => new Date().toISOString().slice(0, 10);

const parts = (d) => {
  const dt = new Date(`${d}T12:00:00`);
  if (Number.isNaN(dt.getTime())) return { day: "--", month: "", weekday: "" };
  return {
    day: dt.toLocaleDateString("pt-BR", { day: "2-digit" }),
    month: dt.toLocaleDateString("pt-BR", { month: "short" }).replace(".", ""),
    weekday: dt.toLocaleDateString("pt-BR", { weekday: "long" }),
  };
};

const ShowRow = ({ show, i }) => {
  const p = parts(show.date);
  return (
    <div data-testid={`show-row-${i}`} className="group grid grid-cols-[auto_1fr] items-center gap-5 border-b border-white/10 py-7 transition-colors duration-300 hover:bg-white/[0.03] sm:grid-cols-[140px_1fr_auto] sm:gap-8 sm:px-4">
      <div className="font-display flex items-baseline gap-2 uppercase leading-none">
        <span className="text-5xl text-[color:var(--gold)] sm:text-6xl">{p.day}</span>
        <span className="text-xl text-zinc-300">{p.month}</span>
      </div>
      <div>
        <h3 className="font-display text-2xl uppercase leading-tight sm:text-3xl">{show.city}</h3>
        <p className="mt-1 text-sm text-zinc-300">{show.venue}{show.venue && p.weekday ? " · " : ""}<span className="capitalize">{p.weekday}</span></p>
      </div>
      {show.ticket_url ? (
        <a href={show.ticket_url} target="_blank" rel="noreferrer" data-testid={`show-ticket-btn-${i}`} className="col-span-2 inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--gold)]/50 px-6 py-3 text-sm font-semibold text-[color:var(--gold)] transition-colors duration-300 hover:bg-[color:var(--gold)] hover:text-black sm:col-span-1">
          Ingressos <i className="fa-solid fa-arrow-right -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
        </a>
      ) : (
        <span className="font-mono-accent col-span-2 text-xs uppercase tracking-widest text-zinc-400 sm:col-span-1">Em breve</span>
      )}
    </div>
  );
};

export const Shows = ({ shows, profile }) => {
  const upcoming = (Array.isArray(shows) ? shows : [])
    .filter((s) => s?.date && s.date >= today())
    .sort((a, b) => a.date.localeCompare(b.date));
  return (
    <section id="agenda" className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
      <SectionLabel index="04" label="Agenda" />
      <h2 className="font-display mt-5 text-5xl uppercase leading-[0.95] sm:text-7xl">
        <MaskLine inView>Próximos</MaskLine>
        <MaskLine inView delay={0.1} className="text-[color:var(--gold)]">shows</MaskLine>
      </h2>
      <div data-testid="shows-list" className="mt-12 border-t border-white/10">
        {upcoming.length ? (
          upcoming.map((s, i) => <Reveal key={s.id || i} delay={i * 0.05}><ShowRow show={s} i={i} /></Reveal>)
        ) : (
          <div data-testid="shows-empty" className="flex flex-wrap items-center justify-between gap-4 py-10">
            <p className="text-zinc-300">Nenhuma data anunciada ainda. Quer o Scooby na sua cidade?</p>
            <a href={whatsappHref(profile)} target="_blank" rel="noreferrer" data-testid="shows-empty-booking-btn" className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition-colors duration-300 hover:border-[#25D366] hover:text-[#25D366]">
              <i className="fa-brands fa-whatsapp mr-2" />Chamar no WhatsApp
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
