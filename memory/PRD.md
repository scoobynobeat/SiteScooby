# PRD — Scooby no Beat (link-in-bio)

## Original problem statement
"Crie um site estilo esse https://link.me/bru_luccas ... eu sou artista sou cantor meu spotify é esse https://open.spotify.com/intl-pt/artist/7A3PnERPZhRjBkdoWKzc7H crie para me"
Later: "Remova toda a parte de backend do projeto, incluindo o servidor e a página de admin/painel do artista. Deixe o site como frontend estático, com as informações do artista fixas diretamente no código."

## Architecture (2026-11-24)
- Static React frontend only. All content in `frontend/src/data/fallback.js` (SITE profile + links, RELEASES, ICONS).
- Images saved in `frontend/public` (artist.jpg, covers, link_*.jpg/webp, logo.png, favicon.png).
- Backend server, admin panel and login removed. /admin redirects to /.

## Implemented
- 2026-10-23: MVP link-in-bio (hero, marquee, link cards, Spotify embed, releases, WhatsApp CTA) + admin panel
- Following iterations: user logo, copy edits, marquee words, booking label
- 2026-11-24: backend + admin removed; content hardcoded

## Backlog
- P1: share button, YouTube video embeds
- P2: fix tagline typo "cahorro" if desired
