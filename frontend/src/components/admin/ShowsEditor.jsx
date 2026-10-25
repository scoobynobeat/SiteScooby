import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

const newShow = () => ({ id: crypto.randomUUID(), date: new Date().toISOString().slice(0, 10), city: "Cidade - UF", venue: "", ticket_url: "" });

export const ShowsEditor = ({ shows, onChange }) => {
  const list = Array.isArray(shows) ? shows : [];
  const update = (i, k, v) => onChange(list.map((s, j) => (j === i ? { ...s, [k]: v } : s)));
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[color:var(--gold)]">Agenda de shows ({list.length})</h2>
        <Button variant="secondary" onClick={() => onChange([...list, newShow()])} data-testid="admin-add-show-btn"><Plus className="mr-2 h-4 w-4" />Adicionar show</Button>
      </div>
      <p className="text-sm text-zinc-400">Shows com data passada somem do site automaticamente.</p>
      {list.map((s, i) => (
        <div key={s.id} data-testid={`admin-show-row-${i}`} className="grid gap-3 rounded-2xl border border-white/10 bg-zinc-950 p-4 sm:grid-cols-[160px_1fr_1fr_1fr_auto]">
          <Input type="date" value={s.date} onChange={(e) => update(i, "date", e.target.value)} data-testid={`admin-show-date-${i}`} />
          <Input placeholder="Cidade" value={s.city} onChange={(e) => update(i, "city", e.target.value)} data-testid={`admin-show-city-${i}`} />
          <Input placeholder="Local / casa de show" value={s.venue} onChange={(e) => update(i, "venue", e.target.value)} data-testid={`admin-show-venue-${i}`} />
          <Input placeholder="Link de ingressos (opcional)" value={s.ticket_url} onChange={(e) => update(i, "ticket_url", e.target.value)} data-testid={`admin-show-ticket-${i}`} />
          <Button type="button" variant="destructive" size="icon" onClick={() => onChange(list.filter((_, j) => j !== i))} data-testid={`admin-show-delete-${i}`}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ))}
    </section>
  );
};
