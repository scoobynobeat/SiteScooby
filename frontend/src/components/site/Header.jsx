import { LogoMark } from "./Logo";

export const Header = ({ profile }) => (
  <header data-testid="header-nav" className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#0A0A0D]/60 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
      <a href="#topo" data-testid="header-logo-link" className="flex items-center gap-3">
        <LogoMark className="h-9 w-auto" />
      </a>
      <a
        href={profile?.socials?.spotify || "#"}
        target="_blank"
        rel="noreferrer"
        data-testid="header-listen-btn"
        className="font-mono-accent flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-4 py-2 text-xs uppercase tracking-widest backdrop-blur-xl transition-colors duration-300 hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
      >
        <i className="fa-brands fa-spotify text-[#1DB954]" /> Ouvir
      </a>
    </div>
  </header>
);
