import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import { ICONS } from "@/data/fallback";

export const LinkEditor = ({ link, index, total, onChange, onMove, onRemove }) => {
  const set = (k, v) => onChange({ ...link, [k]: v });
  return (
    <div data-testid={`admin-link-row-${index}`} className="grid gap-3 rounded-2xl border border-white/10 bg-zinc-950 p-4 sm:grid-cols-[96px_1fr]">
      <img src={link.image || "/artist.jpg"} alt="" className="h-24 w-24 rounded-xl object-cover" />
      <div className="grid gap-3 sm:grid-cols-2">
        <Input placeholder="Título" value={link.title} onChange={(e) => set("title", e.target.value)} data-testid={`admin-link-title-${index}`} />
        <Input placeholder="Subtítulo" value={link.subtitle} onChange={(e) => set("subtitle", e.target.value)} data-testid={`admin-link-subtitle-${index}`} />
        <Input placeholder="URL do link" value={link.url} onChange={(e) => set("url", e.target.value)} data-testid={`admin-link-url-${index}`} />
        <Input placeholder="URL da imagem" value={link.image} onChange={(e) => set("image", e.target.value)} data-testid={`admin-link-image-${index}`} />
        <select value={link.icon} onChange={(e) => set("icon", e.target.value)} data-testid={`admin-link-icon-${index}`} className="h-9 rounded-md border border-input bg-transparent px-3 text-sm">
          {Object.keys(ICONS).map((k) => <option key={k} value={k} className="bg-zinc-900">{k}</option>)}
        </select>
        <div className="flex gap-2">
          <Button type="button" variant="secondary" size="icon" disabled={index === 0} onClick={() => onMove(-1)} data-testid={`admin-link-up-${index}`}><ArrowUp className="h-4 w-4" /></Button>
          <Button type="button" variant="secondary" size="icon" disabled={index === total - 1} onClick={() => onMove(1)} data-testid={`admin-link-down-${index}`}><ArrowDown className="h-4 w-4" /></Button>
          <Button type="button" variant="destructive" size="icon" onClick={onRemove} data-testid={`admin-link-delete-${index}`}><Trash2 className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
};
