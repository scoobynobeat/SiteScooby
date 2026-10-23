import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { LoginForm } from "@/components/admin/LoginForm";
import { Dashboard } from "@/components/admin/Dashboard";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(null);

  useEffect(() => {
    api.get("/auth/me").then((r) => setUser(r.data)).catch(() => setUser(false));
  }, []);

  useEffect(() => {
    if (user) {
      api.get("/page").then((r) => setPage(r.data)).catch(() => setPage(null));
    }
  }, [user]);

  const logout = async () => {
    await api.post("/auth/logout").catch(() => {});
    setUser(false);
  };

  return (
    <main data-testid="admin-page" className="min-h-screen bg-[#0A0A0D] text-white">
      {user === null && <p className="p-10 text-zinc-400">Carregando...</p>}
      {user === false && <div className="grid min-h-screen place-items-center px-5"><LoginForm onLogin={setUser} /></div>}
      {user && page && <Dashboard initial={page} onLogout={logout} />}
    </main>
  );
}
