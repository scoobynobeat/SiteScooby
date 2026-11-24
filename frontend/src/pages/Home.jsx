import { SITE } from "@/data/fallback";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { LinkCards } from "@/components/site/LinkCards";
import { SpotifyPlayer } from "@/components/site/SpotifyPlayer";
import { Releases } from "@/components/site/Releases";
import { BookingCTA } from "@/components/site/BookingCTA";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  const { profile, links } = SITE;
  return (
    <SmoothScroll>
      <main data-testid="home-page" className="relative overflow-x-clip bg-[#0A0A0D] text-white">
        <Header profile={profile} />
        <Hero profile={profile} />
        <Marquee words={profile.marquee_words} />
        <LinkCards links={links} />
        <SpotifyPlayer profile={profile} />
        <Releases />
        <BookingCTA profile={profile} />
        <Footer profile={profile} />
      </main>
    </SmoothScroll>
  );
}
