const WORDS = ["Cachorro na voz", "Arrochadeira", "Paredão", "No Beat", "Joga Pro Cachorro", "Scooby no Beat"];

const Row = () => (
  <div className="flex shrink-0 items-center">
    {WORDS.map((w, i) => (
      <span key={w} className="flex items-center">
        <span className={`font-display px-8 text-5xl uppercase sm:text-7xl ${i % 2 ? "text-outline" : "text-white"}`}>{w}</span>
        <i className="fa-solid fa-paw text-2xl text-[color:var(--gold)]" />
      </span>
    ))}
  </div>
);

export const Marquee = () => (
  <div data-testid="editorial-marquee" className="relative -rotate-2 border-y border-[color:var(--gold)]/30 bg-[#0d0d11] py-6">
    <div className="animate-marquee flex w-max">
      <Row />
      <Row />
    </div>
  </div>
);
