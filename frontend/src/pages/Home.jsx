import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { FALLBACK_PAGE } from "@/data/fallback";
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
  const [page, setPage] = useState(FALLBACK_PAGE);

  useEffect(() => {
    let alive = true;
    api.get("/page")
      .then((res) => {
        if (alive && res.data?.profile && Array.isArray(res.data?.links)) setPage(res.data);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const profile = page.profile;
  return (
    <SmoothScroll>
      <main data-testid="home-page" className="relative overflow-x-clip bg-[#0A0A0D] text-white">
        <Header profile={profile} />
        <Hero profile={profile} />
        <Marquee />
        <LinkCards links={page.links} />
        <SpotifyPlayer profile={profile} />
        <Releases />
        <BookingCTA profile={profile} />
        <Footer profile={profile} />
      </main>
    </SmoothScroll>
  );
}
