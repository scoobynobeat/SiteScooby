import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FIELDS = [
  ["name", "Nome artístico"], ["handle", "@ (usuário)"], ["tagline", "Frase de destaque"],
  ["bio", "Bio curta"], ["listeners", "Ouvintes mensais"], ["spotify_artist_id", "ID do artista no Spotify"],
  ["whatsapp_message", "Mensagem padrão do WhatsApp"],
  ["booking_label", "Texto do botão \"Contratar show\""],
];
const SOCIALS = [["spotify", "Spotify"], ["instagram", "Instagram"], ["youtube", "YouTube"], ["tiktok", "TikTok"], ["whatsapp", "WhatsApp (https://wa.me/55DDDNUMERO)"]];

const Field = ({ id, label, value, onChange }) => (
  <div className="space-y-1.5">
    <Label htmlFor={id} className="text-zinc-300">{label}</Label>
    <Input id={id} value={value ?? ""} onChange={(e) => onChange(e.target.value)} data-testid={`profile-${id}-input`} />
  </div>
);

export const ProfileEditor = ({ profile, onChange }) => {
  const set = (k, v) => onChange({ ...profile, [k]: v });
  const setSocial = (k, v) => onChange({ ...profile, socials: { ...profile.socials, [k]: v } });
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {FIELDS.map(([k, l]) => <Field key={k} id={k} label={l} value={profile[k]} onChange={(v) => set(k, v)} />)}
      {SOCIALS.map(([k, l]) => <Field key={k} id={`social-${k}`} label={l} value={profile.socials?.[k]} onChange={(v) => setSocial(k, v)} />)}
    </div>
  );
};
