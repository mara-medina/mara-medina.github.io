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
PIEZAS.forEach((p, i) => {
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
  if (i === 0) {
    b.onclick = () => abrir(p);
    document.getElementById("reel").appendChild(b);
    return;
  }
  // Los proyectos van en el carrusel: un clic lo centra y lo abre completo en el reproductor
  const slide = document.createElement("div");
  slide.className = "swiper-slide";
  slide.appendChild(b);
  b.onclick = () => elegir(i - 1, p);
  document.getElementById("proyectos").appendChild(slide);
});
const loops = [...document.querySelectorAll(".pieza video")];

// Carrusel plano: sin efecto 3D (con profundidad los laterales quedaban detrás y no recibían clics)
const carrusel = new Swiper(".carrusel", {
  centeredSlides: true,
  spaceBetween: 12,
  breakpoints: { 1001: { spaceBetween: 24 } },
  slidesPerView: "auto",
  initialSlide: 1,
  grabCursor: true,
  speed: quieto ? 0 : 500,
  keyboard: { enabled: true },
  navigation: { prevEl: ".carrusel__flecha--prev", nextEl: ".carrusel__flecha--next" },
  pagination: { el: ".carrusel__puntos", clickable: true },
  a11y: { prevSlideMessage: "Proyecto anterior", nextSlideMessage: "Proyecto siguiente", paginationBulletMessage: "Ir al proyecto {{index}}" },
});

// Clic en un proyecto: si está a un lado, primero se centra y al llegar se abre en el reproductor
function elegir(indice, p) {
  if (carrusel.activeIndex === indice) return abrir(p);
  carrusel.once("slideChangeTransitionEnd", () => abrir(p));
  carrusel.slideTo(indice);
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
  const texto = b.textContent, aviso = b.parentElement.querySelector(".copiar__aviso");
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
    b.textContent = "¡Copiado!";
    b.classList.add("copiado");
    aviso.textContent = "Correo copiado al portapapeles";
    clearTimeout(b._t);
    b._t = setTimeout(() => { b.textContent = texto; b.classList.remove("copiado"); aviso.textContent = ""; }, 2000);
  });
});

// Chrome pausa los videos de pestañas en segundo plano: al volver, los loops siguen
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && !visor.open && !quieto) loops.forEach(v => v.play().catch(() => {}));
});

