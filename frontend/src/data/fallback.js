export const SITE = {
  url: "https://scoobynobeat.com.br",
  share_message: "Conheça o Scooby no Beat! Ouça e siga:",
  profile: {
    name: "Scooby no Beat",
    handle: "@scoobynobeat",
    tagline: "Joga pro cachorro",
    listeners: "120,5 mil",
    avatar: "/artist.webp",
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
    marquee_words: ["Cachorro na voz", "Arrochafunk", "Paredão", "No Beat", "Joga Pro Cachorro", "Scooby no Beat"],
  },
  links: [
    { id: "l1", title: "Piercing no Peito 🔥", subtitle: "Lançamento • Ouça agora no Spotify", url: "https://open.spotify.com/intl-pt/artist/7A3PnERPZhRjBkdoWKzc7H?si=1BlRuXBvTvS1rJIcV2XwXw", image: "/capa_PiercingnoPeito.webp", icon: "spotify" },
    { id: "l2", title: "Instagram", subtitle: "Bastidores, shows e novidades", url: "https://www.instagram.com/scoobynobeat", image: "/artist.webp", icon: "instagram" },
    { id: "l3", title: "TikTok", subtitle: "As Trends do Paredão", url: "https://www.tiktok.com/@scoobynobeat", image: "/link_tiktok.webp", icon: "tiktok" },
    { id: "l4", title: "YouTube", subtitle: "Clipes e Visualizers", url: "https://www.youtube.com/@scoobynobeat", image: "/link_youtube.webp", icon: "youtube" },
    { id: "l5", title: "Contrate para shows", subtitle: "Fale direto no WhatsApp", url: "https://wa.me/5573982260592?text=Ol%C3%A1%20Barreto!%20Quero%20contratar%20um%20show%20de%20Scooby%20no%20Beat.", image: "/link_whatsapp.webp", icon: "whatsapp" },
  ],
};

export function shareHref() {
  return `https://wa.me/?text=${encodeURIComponent(`${SITE.share_message} ${SITE.url}`)}`;
}

export function whatsappHref(profile) {
  const base = profile?.socials?.whatsapp || "";
  if (!base) return "#";
  const msg = profile?.whatsapp_message;
  return msg ? `${base}?text=${encodeURIComponent(msg)}` : base;
}
