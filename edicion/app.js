// Categorías y etiquetas tomadas del demo reel de Mara
const PIEZAS = [
  { id: "demo-reel", tema: "Demo reel 2026", titulo: "Short-form · Comerciales · Motion graphics", rol: "Edición · Motion · Color", dur: "1:58", audio: true },
  { id: "influencer", tema: "Moda", titulo: "Andrea Álvarez · Moda y lifestyle", rol: "Transiciones · Subtítulos · Motion graphics · Humor", dur: "1:44", audio: true },
  { id: "aurea", tema: "Comercial de perfume", titulo: "AURÉA · Concepto publicitario", rol: "Narrativa visual · Color · Ritmo · Branding", dur: "0:28", audio: false },
  { id: "bienes-raices", tema: "Bienes raíces", titulo: "Recorrido de propiedad", rol: "Títulos animados · Subtítulos · Ritmo de recorrido", dur: "0:39", audio: true },
  { id: "podcast", tema: "Podcast", titulo: "Contenido informativo · Retención", rol: "Motion graphics · Subtítulos keyword · B-roll", dur: "0:31", audio: true },
];
const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;

// El reel corre completo y sin sonido en la cabecera; los proyectos muestran un loop de 4 s.
// Al hacer clic, cualquiera se abre completo con sonido en el reproductor.
function crearPieza(p, i) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "pieza" + (i === 0 ? " pieza--reel" : "");
  b.setAttribute("aria-label", `Ver ${p.tema}: ${p.titulo}, ${p.dur}${p.audio ? "" : ", sin audio"}`);
  const fuente = i === 0 ? `media/${p.id}.mp4` : `media/previa/${p.id}.mp4`;
  b.innerHTML = `<span class="pieza__marco">
      <video src="${fuente}" poster="media/${p.id}.jpg" muted loop playsinline preload="${i === 0 ? "auto" : "metadata"}" ${quieto ? "" : "autoplay"}></video>
      <span class="pieza__ver">${i === 0 ? "▶ Ver con sonido" : "▶ Ver completo"} · ${p.dur}${p.audio ? "" : " · sin audio"}</span>
    </span>
    <span class="pieza__tema">${p.tema}</span><span class="pieza__titulo">${p.titulo}</span><span class="pieza__rol">${p.rol}</span>`;
  return b;
}
const reel = crearPieza(PIEZAS[0], 0);
reel.onclick = () => abrir(PIEZAS[0]);
document.getElementById("reel").appendChild(reel);

// Los proyectos van en el carrusel infinito. Swiper necesita más slides que los que caben a la vista
// para dar la vuelta, así que los 4 proyectos se ponen dos veces; la copia no se anuncia ni recibe foco.
const PROYECTOS = PIEZAS.slice(1);
const N = PROYECTOS.length;
for (let k = 0; k < N * 2; k++) {
  const p = PROYECTOS[k % N];
  const b = crearPieza(p, k % N + 1);
  const slide = document.createElement("div");
  slide.className = "swiper-slide";
  if (k >= N) { slide.setAttribute("aria-hidden", "true"); b.tabIndex = -1; }
  slide.appendChild(b);
  // Clic en un proyecto: si está a un lado, primero se centra y al llegar se abre en el reproductor
  b.onclick = () => elegir(k, p);
  document.getElementById("proyectos").appendChild(slide);
}
const loops = [...document.querySelectorAll(".pieza video")];

// Puntos propios: siempre 4, uno por proyecto, aunque los slides estén duplicados
const puntos = document.querySelector(".carrusel__puntos");
puntos.innerHTML = PROYECTOS.map((p, i) => `<button type="button" class="swiper-pagination-bullet" aria-label="Ir a ${p.tema}"></button>`).join("");
const botonesPunto = [...puntos.children];
// Recibe el carrusel como parámetro: durante el arranque de Swiper la constante "carrusel" aún no existe
function marcarPunto(sw) {
  botonesPunto.forEach((b, i) => b.classList.toggle("swiper-pagination-bullet-active", i === sw.realIndex % N));
}

// Carrusel plano: sin efecto 3D (con profundidad los laterales quedaban detrás y no recibían clics)
const carrusel = new Swiper(".carrusel", {
  centeredSlides: true,
  spaceBetween: 12,
  breakpoints: { 1001: { spaceBetween: 24 } },
  slidesPerView: "auto",
  initialSlide: 1,
  loop: true,
  grabCursor: true,
  speed: quieto ? 0 : 500,
  keyboard: { enabled: true },
  navigation: { prevEl: ".carrusel__flecha--prev", nextEl: ".carrusel__flecha--next" },
  a11y: { prevSlideMessage: "Proyecto anterior", nextSlideMessage: "Proyecto siguiente" },
  on: { init: marcarPunto, realIndexChange: marcarPunto },
});

// Un punto lleva a la copia de ese proyecto que quede más cerca, para no dar media vuelta
botonesPunto.forEach((b, i) => b.addEventListener("click", () => {
  const actual = carrusel.realIndex, total = N * 2;
  const dist = k => Math.min(Math.abs(k - actual), total - Math.abs(k - actual));
  carrusel.slideToLoop(dist(i) <= dist(i + N) ? i : i + N);
}));

// En modo infinito Swiper reordena los slides: se usa la posición real del slide (realIndex)
function elegir(k, p) {
  if (carrusel.realIndex === k) return abrir(p);
  carrusel.once("slideChangeTransitionEnd", () => abrir(p));
  carrusel.slideToLoop(k);
}

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

// Copiar el correo al portapapeles, con respaldo para navegadores sin la API moderna
document.querySelectorAll("[data-copiar]").forEach(b => {
  const icono = b.innerHTML, aviso = b.parentElement.querySelector(".copiar__aviso");
  b.addEventListener("click", async () => {
    const valor = b.dataset.copiar;
    try {
      await navigator.clipboard.writeText(valor);
    } catch {
      const t = document.createElement("textarea");
      t.value = valor;
      t.setAttribute("readonly", "");
      t.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
    b.classList.add("copiado");
    aviso.textContent = "Correo copiado al portapapeles";
    clearTimeout(b._t);
    b._t = setTimeout(() => { b.innerHTML = icono; b.classList.remove("copiado"); aviso.textContent = ""; }, 2000);
  });
});

// Chrome pausa los videos de pestañas en segundo plano: al volver, los loops siguen
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && !visor.open && !quieto) loops.forEach(v => v.play().catch(() => {}));
});

