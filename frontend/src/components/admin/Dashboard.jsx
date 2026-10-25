import { useState } from "react";
import { toast } from "sonner";
import { Plus, LogOut, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api, formatApiError } from "@/lib/api";
import { ProfileEditor } from "./ProfileEditor";
import { LinkEditor } from "./LinkEditor";
import { ShowsEditor } from "./ShowsEditor";

const newLink = () => ({ id: crypto.randomUUID(), title: "Novo link", subtitle: "", url: "https://", image: "/artist.jpg", icon: "link" });

export const Dashboard = ({ initial, onLogout }) => {
  const [page, setPage] = useState(initial);
  const [saving, setSaving] = useState(false);
  const links = page.links;
  const setLinks = (l) => setPage({ ...page, links: l });

  const move = (i, d) => {
    const next = [...links];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    setLinks(next);
  };

  const save = async () => {
    setSaving(true);
    try {
      const { data } = await api.put("/page", page);
      setPage(data);
      toast.success("Página salva! Já está no ar.");
    } catch (e) {
      toast.error(formatApiError(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-5 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-4xl uppercase sm:text-5xl">Painel</h1>
        <div className="flex gap-2">
          <Button variant="secondary" asChild><a href="/" target="_blank" rel="noreferrer" data-testid="admin-view-site-btn"><ExternalLink className="mr-2 h-4 w-4" />Ver site</a></Button>
          <Button variant="secondary" onClick={onLogout} data-testid="admin-logout-btn"><LogOut className="mr-2 h-4 w-4" />Sair</Button>
        </div>
      </div>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-[color:var(--gold)]">Perfil e redes</h2>
        <ProfileEditor profile={page.profile} onChange={(p) => setPage({ ...page, profile: p })} />
      </section>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[color:var(--gold)]">Links ({links.length})</h2>
          <Button variant="secondary" onClick={() => setLinks([...links, newLink()])} data-testid="admin-add-link-btn"><Plus className="mr-2 h-4 w-4" />Adicionar</Button>
        </div>
        {links.map((l, i) => (
          <LinkEditor key={l.id} link={l} index={i} total={links.length}
            onChange={(v) => setLinks(links.map((x, j) => (j === i ? v : x)))}
            onMove={(d) => move(i, d)}
            onRemove={() => setLinks(links.filter((_, j) => j !== i))} />
        ))}
      </section>
      <ShowsEditor shows={page.shows} onChange={(s) => setPage({ ...page, shows: s })} />
      <div className="sticky bottom-4 flex justify-end">
        <Button size="lg" onClick={save} disabled={saving} data-testid="admin-save-links-btn" className="rounded-full px-10 shadow-2xl">
          {saving ? "Salvando..." : "Salvar alterações"}
        </Button>
      </div>
    </div>
  );
};
