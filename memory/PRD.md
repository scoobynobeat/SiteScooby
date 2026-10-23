# PRD — Scooby no Beat (link-in-bio)

## Original problem statement
"Crie um site estilo esse https://link.me/bru_luccas ... eu sou artista sou cantor meu spotify é esse https://open.spotify.com/intl-pt/artist/7A3PnERPZhRjBkdoWKzc7H crie para me"
Choices: Spotify + Instagram + YouTube + TikTok + WhatsApp (shows); admin panel with password; embedded Spotify player; dark & elegant with photo; name "Scooby no Beat", @scoobynobeat.

## Architecture
- FastAPI + MongoDB: `page` collection (singleton key=main: profile + links), `users` (admin, bcrypt), `login_attempts`. JWT httpOnly cookies.
- Endpoints: GET /api/page, PUT /api/page (admin), POST /api/page/reset (admin), /api/auth/login|me|logout
- React: Home (Hero, Marquee, LinkCards bento, SpotifyPlayer, Releases, BookingCTA), /admin (login + dashboard). Lenis + framer-motion. Self-hosted fonts (Anton, Bricolage Grotesque, JetBrains Mono) + FontAwesome.

## Personas
- Fans (visit links, listen); contractors (book via WhatsApp); artist (edits via /admin).

## Implemented (2026-10-23)
- Full landing/link-in-bio page, mobile-first, admin CRUD for profile/social/links with reorder, saved to DB.
- Artist photo + covers downloaded from Spotify into /public.

## Placeholders
- WhatsApp number: https://wa.me/5500000000000
- Instagram/TikTok/YouTube URLs assumed @scoobynobeat

## Backlog
- P1: image upload in admin (instead of URL), click analytics per link
- P2: agenda de shows, YouTube video embeds, password change in admin
