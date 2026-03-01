
async function loadJSON(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error("Errore caricamento " + path);
  return res.json();
}
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (m) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}
function fmtDate(iso) {
  if (!iso) return "—";
  try { return new Date(iso).toLocaleDateString("it-IT"); } catch { return iso; }
}
function chip(label) {
  return `<span class="rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1 text-xs text-slate-200">${esc(label)}</span>`;
}
