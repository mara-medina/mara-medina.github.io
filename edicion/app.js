// Categorías y etiquetas tomadas del demo reel de Mara
const PIEZAS = [
  { id: "demo-reel", tema: "Demo reel 2026", titulo: "Short-form · Comerciales · Motion graphics", rol: "Edición · Motion · Color", dur: "1:58", audio: true },
  { id: "influencer", tema: "Moda", titulo: "Andrea Álvarez · Moda y lifestyle", rol: "Transiciones · Subtítulos · Motion graphics · Humor", dur: "1:44", audio: true },
  { id: "aurea", tema: "Comercial de perfume", titulo: "AURÉA · Concepto publicitario", rol: "Narrativa visual · Color · Ritmo · Branding", dur: "0:28", audio: false },
  { id: "bienes-raices", tema: "Bienes raíces", titulo: "Recorrido de propiedad", rol: "Títulos animados · Subtítulos · Ritmo de recorrido", dur: "0:39", audio: true },
  { id: "podcast", tema: "Podcast", titulo: "Contenido informativo · Retención", rol: "Motion graphics · Subtítulos keyword · B-roll", dur: "0:31", audio: true },
];
const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Cada pieza muestra un loop corto sin sonido; al hacer clic se abre completa con sonido
PIEZAS.forEach((p, i) => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "pieza" + (i === 0 ? " pieza--reel" : "");
  b.setAttribute("aria-label", `Ver ${p.tema}: ${p.titulo}, ${p.dur}${p.audio ? "" : ", sin audio"}`);
  b.innerHTML = `<span class="pieza__marco">
      <video src="media/previa/${p.id}.mp4" poster="media/${p.id}.jpg" muted loop playsinline ${quieto ? "" : "autoplay"}></video>
      <span class="pieza__ver">${i === 0 ? "Ver reel completo" : "Ver completo"} · ${p.dur}${p.audio ? "" : " · sin audio"}</span>
    </span>
    <span class="pieza__tema">${p.tema}</span><span class="pieza__titulo">${p.titulo}</span><span class="pieza__rol">${p.rol}</span>`;
  b.onclick = () => abrir(p);
  document.getElementById(i === 0 ? "reel" : "proyectos").appendChild(b);
});
const loops = [...document.querySelectorAll(".pieza video")];

const visor = document.getElementById("visor");
const completo = visor.querySelector("video");
function abrir(p) {
  completo.src = `media/${p.id}.mp4`;
  completo.poster = `media/${p.id}.jpg`;
  visor.querySelector(".visor__tema").textContent = p.tema + (p.audio ? "" : " · sin audio");
  visor.querySelector(".visor__titulo").textContent = p.titulo;
  loops.forEach(v => v.pause());
  visor.showModal();
  completo.play().catch(() => {});
}
// El cierre no depende del evento "close" (algunos navegadores no lo disparan): todas las vías pasan por aquí
function cerrar() {
  if (visor.open) visor.close();
  if (!completo.getAttribute("src")) return;
  completo.pause();
  completo.removeAttribute("src");
  completo.load();
  if (!quieto) loops.forEach(v => v.play().catch(() => {}));
}
visor.querySelector(".visor__cerrar").onclick = cerrar;
visor.addEventListener("click", e => { if (e.target === visor) cerrar(); });
visor.addEventListener("cancel", e => { e.preventDefault(); cerrar(); });
visor.addEventListener("close", cerrar);
