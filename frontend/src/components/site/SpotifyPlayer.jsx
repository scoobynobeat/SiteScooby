import { Reveal, SectionLabel, MaskLine } from "./Reveal";

export const SpotifyPlayer = ({ profile }) => {
  const id = profile?.spotify_artist_id;
  return (
    <section id="ouvir" className="mx-auto grid max-w-6xl gap-12 px-5 py-28 sm:px-8 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <SectionLabel index="02" label="Ouça agora" />
        <h2 className="font-display mt-5 text-5xl uppercase leading-[0.95] sm:text-7xl">
          <MaskLine inView>Aperta</MaskLine>
          <MaskLine inView delay={0.1} className="text-[#1DB954]">o play</MaskLine>
        </h2>
        <p className="mt-6 max-w-sm text-zinc-300">Todos os sons direto do Spotify. Segue lá pra não perder nenhum lançamento.</p>
        <div className="mt-10 flex items-end gap-4">
          <span className="font-display text-6xl text-[color:var(--gold)] sm:text-7xl">{profile?.listeners}</span>
          <span className="font-mono-accent pb-2 text-xs uppercase tracking-widest text-zinc-300">ouvintes<br />mensais</span>
        </div>
      </div>
      <Reveal className="lg:col-span-3">
        {id ? (
          <div className="rounded-[1.75rem] border border-[#1DB954]/25 bg-[#0f1411] p-2 shadow-[0_30px_100px_-40px_rgba(29,185,84,0.6)]">
            <iframe
              data-testid="spotify-artist-embed"
              title="Spotify"
              src={`https://open.spotify.com/embed/artist/${id}?utm_source=generator&theme=0`}
              width="100%"
              height="452"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-[1.4rem]"
            />
          </div>
        ) : null}
      </Reveal>
    </section>
  );
};
