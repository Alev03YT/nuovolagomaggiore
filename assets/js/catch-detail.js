
(async function(){
  const id = new URL(window.location.href).searchParams.get("id");
  const lake = await loadJSON("data/laghetto.json");
  const catchesRaw = await loadJSON("data/catches.json");
  const catches = Array.isArray(catchesRaw) ? catchesRaw : (catchesRaw.items || []);

  const c = catches.find(x => String(x.id) === String(id));
  if (!c) {
    document.getElementById("title").textContent = "Cattura non trovata";
    return;
  }

  document.title = `${c.titolo} | ${lake.name}`;
  document.getElementById("title").textContent = c.titolo || "Cattura";
  document.getElementById("meta").innerHTML = [
    chip(fmtDate(c.data)),
    chip(c.specie || "—"),
    chip(c.tecnica || "—"),
    (c.pesoKg ? chip(c.pesoKg + " kg") : "")
  ].filter(Boolean).join("");

  document.getElementById("notes").textContent = c.note || "";

  const slider = document.getElementById("slider");
  const urls = (c.foto || []).filter(Boolean);

  if (!urls.length) {
    slider.innerHTML = `<div class="grid place-items-center p-10 text-sm text-slate-400">Nessuna foto per questa cattura.</div>`;
  } else {
    slider.innerHTML = `
      <div class="relative">
        <img id="img" class="h-[380px] w-full object-cover" src="${esc(urls[0])}" alt="foto"/>
        <div class="absolute inset-x-0 bottom-0 flex items-center justify-between p-3">
          <button id="prev" class="rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs text-slate-200 hover:border-slate-500">←</button>
          <div id="count" class="text-xs text-slate-200">1/${urls.length}</div>
          <button id="next" class="rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs text-slate-200 hover:border-slate-500">→</button>
        </div>
      </div>
    `;
    let i = 0;
    const img = document.getElementById("img");
    const count = document.getElementById("count");
    function render(){ img.src = urls[i]; count.textContent = `${i+1}/${urls.length}`; }
    document.getElementById("prev").onclick = () => { i = (i - 1 + urls.length) % urls.length; render(); };
    document.getElementById("next").onclick = () => { i = (i + 1) % urls.length; render(); };
  }
})().catch(console.error);
