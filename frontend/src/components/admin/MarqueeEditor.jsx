import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export const MarqueeEditor = ({ words, onChange }) => {
  const list = Array.isArray(words) ? words : [];
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[color:var(--gold)]">Faixa que rola ({list.length})</h2>
        <Button variant="secondary" onClick={() => onChange([...list, "Nova palavra"])} data-testid="admin-add-marquee-btn"><Plus className="mr-2 h-4 w-4" />Adicionar</Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((w, i) => (
          <div key={i} className="flex gap-2">
            <Input value={w} onChange={(e) => onChange(list.map((x, j) => (j === i ? e.target.value : x)))} data-testid={`admin-marquee-input-${i}`} />
            <Button type="button" variant="destructive" size="icon" onClick={() => onChange(list.filter((_, j) => j !== i))} data-testid={`admin-marquee-delete-${i}`}><Trash2 className="h-4 w-4" /></Button>
          </div>
        ))}
      </div>
    </section>
  );
};
