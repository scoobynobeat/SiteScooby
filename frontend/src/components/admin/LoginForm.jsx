import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/site/Logo";
import { api, formatApiError } from "@/lib/api";

export const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      onLogin(data);
    } catch (err) {
      setError(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} data-testid="admin-panel-modal" className="mx-auto w-full max-w-sm space-y-5 rounded-[1.75rem] border border-white/10 bg-zinc-950 p-8">
      <LogoMark className="mx-auto block h-12 w-auto" />
      <h1 className="font-display text-4xl uppercase">Área do artista</h1>
      <div className="space-y-2">
        <Label htmlFor="email">Usuário</Label>
        <Input id="email" type="text" autoCapitalize="none" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} data-testid="admin-email-input" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} data-testid="admin-password-input" />
      </div>
      {error && <p data-testid="admin-login-error" className="text-sm text-red-400">{error}</p>}
      <Button type="submit" disabled={loading} data-testid="admin-login-btn" className="w-full rounded-full">
        {loading ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
};
