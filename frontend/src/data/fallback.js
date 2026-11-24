export const SITE = {
  profile: {
    name: "Scooby no Beat",
    handle: "@scoobynobeat",
    tagline: "Joga pro cachorro",
    bio: "",
    listeners: "120,5 mil",
    avatar: "/artist.jpg",
    spotify_artist_id: "7A3PnERPZhRjBkdoWKzc7H",
    whatsapp_message: "Olá Barreto! Quero contratar um show de Scooby no Beat.",
    booking_label: "Contato para Shows",
    socials: {
      spotify: "https://open.spotify.com/artist/7A3PnERPZhRjBkdoWKzc7H",
      instagram: "https://www.instagram.com/scoobynobeat",
      youtube: "https://www.youtube.com/@scoobynobeat",
      tiktok: "https://www.tiktok.com/@scoobynobeat",
      whatsapp: "https://wa.me/5573982260592",
    },
    marquee_words: ["Cachorro na voz", "Arrochadeira", "Paredão", "No Beat", "Joga Pro Cachorro", "Scooby no Beat"],
  },
  links: [
    { id: "l1", title: "Dia de Revoada", subtitle: "Lançamento • Ouça agora no Spotify", url: "https://open.spotify.com/album/3wqwvczpjhixMYHBXynIsY", image: "/link_spotify.jpg", icon: "spotify" },
    { id: "l2", title: "Instagram", subtitle: "Bastidores, shows e novidades", url: "https://www.instagram.com/scoobynobeat", image: "/artist.jpg", icon: "instagram" },
    { id: "l3", title: "TikTok", subtitle: "As trends do paredão", url: "https://www.tiktok.com/@scoobynobeat", image: "/link_tiktok.jpg", icon: "tiktok" },
    { id: "l4", title: "YouTube", subtitle: "Clipes e visualizers", url: "https://www.youtube.com/@scoobynobeat", image: "/link_youtube.jpg", icon: "youtube" },
    { id: "l5", title: "Contrate para shows", subtitle: "Fale direto no WhatsApp", url: "https://wa.me/5573982260592?text=Ol%C3%A1%20Barreto!%20Quero%20contratar%20um%20show%20de%20Scooby%20no%20Beat.", image: "/link_whatsapp.webp", icon: "whatsapp" },
  ],
};

export function whatsappHref(profile) {
  const base = profile?.socials?.whatsapp || "";
  if (!base) return "#";
  const msg = profile?.whatsapp_message;
  return msg ? `${base}?text=${encodeURIComponent(msg)}` : base;
}

export const RELEASES = [
  { title: "Dia de Revoada", meta: "Single • Novo", cover: "/cover_5d8514e265b55540d7fd1912.jpg", url: "https://open.spotify.com/album/3wqwvczpjhixMYHBXynIsY" },
  { title: "Cheirinho de Perereca", meta: "Single • 2024", cover: "/cover_357e0e0d3751687f49399159.jpg", url: "https://open.spotify.com/album/1YqXfRfq3BKaYSrpUKaxud" },
  { title: "Carro Bicho", meta: "Single • 2025", cover: "/cover_4f70579dc81f13a09f5e3e8c.jpg", url: "https://open.spotify.com/album/54XzAiGPIyqDZmaJpWtmfU" },
  { title: "Uma Hora Dessa", meta: "Single • 2025", cover: "/cover_3afbbbd197f4702afde49509.jpg", url: "https://open.spotify.com/album/26SVVlsHgrNF4DT6QfyP4K" },
  { title: "Mão no Joelhinho", meta: "Single • 2026", cover: "/cover_fb299efd4014683441366495.jpg", url: "https://open.spotify.com/album/6NFkldRfD1JVvseeCIXYzf" },
  { title: "De Outro Mundo", meta: "EP • 2025", cover: "/cover_1743032675b9bbfd3d63fb66.jpg", url: "https://open.spotify.com/album/43GnAmWk3W454MrDMGiBrB" },
];

export const ICONS = {
  spotify: "fa-brands fa-spotify",
  instagram: "fa-brands fa-instagram",
  youtube: "fa-brands fa-youtube",
  tiktok: "fa-brands fa-tiktok",
  whatsapp: "fa-brands fa-whatsapp",
  link: "fa-solid fa-link",
};
