import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
  withCredentials: true,
});

export function formatApiError(e) {
  const detail = e?.response?.data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((d) => d?.msg).filter(Boolean).join(" ");
  return e?.message || "Algo deu errado. Tente novamente.";
}

export function whatsappHref(profile) {
  const base = profile?.socials?.whatsapp || "";
  if (!base) return "#";
  const msg = profile?.whatsapp_message;
  return msg ? `${base}${base.includes("?") ? "&" : "?"}text=${encodeURIComponent(msg)}` : base;
}
