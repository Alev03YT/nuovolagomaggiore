
(async function(){
  const lake = await loadJSON("data/laghetto.json");
  const gallery = document.getElementById("gallery");
  const imgs = (lake.gallery || []).filter(Boolean);
  if (!imgs.length) {
    gallery.innerHTML = `<div class="col-span-3 text-sm text-slate-400">Nessuna foto in galleria (aggiungile dall'Admin).</div>`;
    return;
  }
  gallery.innerHTML = imgs.map(u => `<a target="_blank" rel="noopener" href="${esc(u)}"><img class="h-24 w-full rounded-xl border border-slate-800 object-cover" src="${esc(u)}" alt="foto"/></a>`).join("");
})().catch(console.error);
