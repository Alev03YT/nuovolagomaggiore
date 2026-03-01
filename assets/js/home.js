
(async function(){
  document.getElementById("year").textContent = String(new Date().getFullYear());
  const lake = await loadJSON("data/laghetto.json");
  const catchesRaw = await loadJSON("data/catches.json");
  const catches = Array.isArray(catchesRaw) ? catchesRaw : (catchesRaw.items || []);

  document.getElementById("stat-catches").textContent = catches.length;
  const species = new Set(catches.map(c => (c.specie||"").trim()).filter(Boolean));
  document.getElementById("stat-species").textContent = species.size;
  const last = catches.map(c => c.data).filter(Boolean).sort().slice(-1)[0];
  document.getElementById("stat-updated").textContent = last ? fmtDate(last) : "—";

  const container = document.getElementById("home-catches");
  const sorted = [...catches].sort((a,b) => (b.data||"").localeCompare(a.data||""));
  const top = sorted.slice(0,4);

  container.innerHTML = top.map(c => {
    const img = (c.foto && c.foto[0]) ? c.foto[0] : "assets/img/favicon.svg";
    return `
      <a class="group flex gap-3 rounded-2xl border border-slate-800 bg-slate-950/30 p-3 hover:border-slate-600" href="catch.html?id=${encodeURIComponent(c.id)}">
        <img class="h-16 w-16 rounded-xl border border-slate-800 object-cover" src="${esc(img)}" alt="foto" />
        <div class="min-w-0">
          <div class="truncate text-sm font-semibold group-hover:text-white">${esc(c.titolo || "Cattura")}</div>
          <div class="mt-1 text-xs text-slate-400">${fmtDate(c.data)} • ${esc(lake.name)}</div>
          <div class="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-300">
            ${chip(c.specie || "—")}
            ${chip(c.tecnica || "—")}
          </div>
        </div>
      </a>
    `;
  }).join("");
})().catch(console.error);
