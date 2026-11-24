import { LogoMark } from "./Logo";

export const Footer = ({ profile }) => (
  <footer className="mx-auto flex max-w-7xl flex-col gap-6 border-t border-white/10 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
    <div className="flex items-center gap-3">
      <LogoMark className="h-8 w-auto" />
      <span data-testid="footer-copyright" className="text-sm text-zinc-400">© {new Date().getFullYear()} {profile?.name} · {profile?.handle}</span>
    </div>
  </footer>
);
