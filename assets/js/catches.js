
(async function(){
  const catchesRaw = await loadJSON("data/catches.json");
  const catches = Array.isArray(catchesRaw) ? catchesRaw : (catchesRaw.items || []);

  const q = document.getElementById("q");
  const specieSel = document.getElementById("specie");
  const sortSel = document.getElementById("sort");
  const feed = document.getElementById("feed");

  const species = [...new Set(catches.map(c => (c.specie||"").trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
  specieSel.innerHTML = `<option value="">Tutte le specie</option>` + species.map(s => `<option value="${esc(s)}">${esc(s)}</option>`).join("");

  function card(c){
    const img = (c.foto && c.foto[0]) ? c.foto[0] : "assets/img/favicon.svg";
    return `
      <a class="group rounded-3xl border border-slate-800 bg-slate-900/30 p-4 hover:border-slate-600" href="catch.html?id=${encodeURIComponent(c.id)}">
        <img class="h-60 w-full rounded-2xl border border-slate-800 object-cover" src="${esc(img)}" alt="foto" />
        <div class="mt-3">
          <div class="text-sm font-semibold group-hover:text-white">${esc(c.titolo||"Cattura")}</div>
          <div class="mt-1 text-xs text-slate-400">${fmtDate(c.data)}</div>
          <div class="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-300">
            ${chip(c.specie || "—")}
            ${chip(c.tecnica || "—")}
            ${c.pesoKg ? chip(c.pesoKg + " kg") : ""}
          </div>
          ${c.note ? `<p class="mt-3 text-sm text-slate-200">${esc(c.note)}</p>` : ""}
        </div>
      </a>
    `;
  }

  function apply(){
    const term = (q.value||"").toLowerCase().trim();
    const sp = (specieSel.value||"").trim();
    const sort = sortSel.value;

    let filtered = catches.filter(c => {
      const hay = `${c.titolo||""} ${c.specie||""} ${c.tecnica||""} ${c.note||""}`.toLowerCase();
      if (term && !hay.includes(term)) return false;
      if (sp && (c.specie||"") !== sp) return false;
      return true;
    });

    filtered.sort((a,b) => (a.data||"").localeCompare(b.data||""));
    if (sort === "new") filtered.reverse();

    feed.innerHTML = filtered.map(card).join("") || `<div class="text-sm text-slate-400">Nessuna cattura trovata.</div>`;
  }

  q.addEventListener("input", apply);
  specieSel.addEventListener("change", apply);
  sortSel.addEventListener("change", apply);

  apply();
})().catch(console.error);
