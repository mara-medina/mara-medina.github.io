// Proyectos en el orden de la secuencia. Categorías y etiquetas tomadas del demo reel de Mara.
const CLIPS = [
  { id: "demo-reel", cat: "Demo reel 2026", titulo: "Short-form · Comerciales · Motion graphics", tags: "Lo mejor de cada proyecto en un solo corte", dur: 118.5, color: "#a79bc4", audio: true },
  { id: "influencer", cat: "Contenido de influencer", titulo: "Andrea Álvarez · Moda y lifestyle", tags: "Transiciones · Subtítulos · Motion graphics · Humor", dur: 104.37, color: "#d08aa6", audio: true },
  { id: "aurea", cat: "Comercial de perfume", titulo: "AURÉA · Concepto publicitario", tags: "Narrativa visual · Color · Ritmo · Branding", dur: 28.4, color: "#c9a45c", audio: false },
  { id: "bienes-raices", cat: "Bienes raíces", titulo: "Recorrido de propiedad", tags: "Títulos animados · Subtítulos · Ritmo de recorrido", dur: 39.3, color: "#8fae96", audio: true },
  { id: "podcast", cat: "Contenido informativo", titulo: "Formato podcast · Retención", tags: "Motion graphics · Subtítulos keyword · B-roll", dur: 30.67, color: "#7f9fc8", audio: true },
];
const FPS = 30;
const TOTAL = CLIPS.reduce((s, c) => s + c.dur, 0);
let inicio = 0;
CLIPS.forEach(c => { c.inicio = inicio; inicio += c.dur; });

const $ = id => document.getElementById(id);
const video = $("video"), sala = document.querySelector(".sala"), pista = $("pista");
const btnSonido = $("btn-sonido");
let actual = 0, quiereSonido = false;

const mmss = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const timecode = s => {
  const f = Math.floor(s * FPS);
  const p = n => String(n).padStart(2, "0");
  return `${p(Math.floor(f / (FPS * 3600)))}:${p(Math.floor(f / (FPS * 60)) % 60)}:${p(Math.floor(f / FPS) % 60)}:${p(f % FPS)}`;
};

// Regla con una marca por cada 30 s
const regla = $("regla");
for (let t = 0; t <= TOTAL; t += 30) {
  const el = document.createElement(t % 60 === 0 ? "span" : "i");
  el.style.left = `${(t / TOTAL) * 100}%`;
  if (t % 60 === 0) el.textContent = mmss(t);
  regla.appendChild(el);
}

// Clips proporcionales a su duración
CLIPS.forEach((c, i) => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "clip";
  b.style.flex = `${c.dur} 1 0`;
  b.style.setProperty("--clip", c.color);
  b.style.setProperty("--miniatura", `url(media/${c.id}.jpg)`);
  b.setAttribute("aria-label", `${c.cat}: ${c.titulo}, ${mmss(c.dur)}`);
  b.innerHTML = `<span class="clip__barra"></span><span class="clip__nombre">${c.cat}</span>`;
  b.addEventListener("click", e => {
    const r = b.getBoundingClientRect();
    const frac = e.detail === 0 ? 0 : Math.min(Math.max((e.clientX - r.left) / r.width, 0), .98);
    cargar(i, frac * c.dur, true);
  });
  pista.appendChild(b);
});
const botones = [...pista.querySelectorAll(".clip")];

function cargar(i, desde = 0, reproducir = false) {
  const c = CLIPS[i];
  if (actual !== i || !video.src) {
    actual = i;
    video.src = `media/${c.id}.mp4`;
    video.poster = `media/${c.id}.jpg`;
  }
  video.currentTime = desde;
  video.muted = !(quiereSonido && c.audio);
  botones.forEach((b, j) => b.classList.toggle("activo", j === i));
  // En pantallas angostas la línea de tiempo se desplaza: mantener visible el clip activo
  const scroll = document.querySelector(".linea__scroll");
  scroll.scrollLeft = botones[i].offsetLeft;
  document.querySelector(".ficha").style.setProperty("--clip", c.color);
  $("f-cat").textContent = c.cat;
  $("f-titulo").textContent = c.titulo;
  $("f-tags").textContent = c.tags;
  $("f-dur").textContent = mmss(c.dur);
  $("f-audio").textContent = c.audio ? "Estéreo" : "Sin audio";
  $("clip-dur").textContent = mmss(c.dur);
  btnSonido.disabled = !c.audio;
  btnSonido.textContent = !c.audio ? "Sin audio" : quiereSonido ? "Sonido activado" : "Activar sonido";
  actualizar();
  if (reproducir) video.play().catch(() => {});
}

function actualizar() {
  const t = CLIPS[actual].inicio + (video.currentTime || 0);
  $("tc").textContent = timecode(t);
  $("clip-tc").textContent = mmss(video.currentTime || 0);
  const pistaEl = document.querySelector(".linea__pista");
  const izq = 52, der = 16;
  const ancho = pistaEl.clientWidth - izq - der;
  $("cabezal").style.left = `${izq + (t / TOTAL) * ancho}px`;
}

function alternar() { video.paused ? video.play().catch(() => {}) : video.pause(); }

video.addEventListener("timeupdate", actualizar);
video.addEventListener("play", () => sala.classList.add("reproduciendo"));
video.addEventListener("pause", () => sala.classList.remove("reproduciendo"));
video.addEventListener("ended", () => cargar((actual + 1) % CLIPS.length, 0, actual + 1 < CLIPS.length));
video.addEventListener("click", alternar);
$("btn-play").addEventListener("click", alternar);
$("play-grande").addEventListener("click", () => video.play().catch(() => {}));
btnSonido.addEventListener("click", () => {
  quiereSonido = !quiereSonido;
  video.muted = !quiereSonido;
  btnSonido.setAttribute("aria-pressed", quiereSonido);
  btnSonido.textContent = quiereSonido ? "Sonido activado" : "Activar sonido";
  if (quiereSonido && video.paused) video.play().catch(() => {});
});
window.addEventListener("resize", actualizar);

cargar(0);
// El reel arranca solo y sin sonido, salvo que la persona pida menos movimiento
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) video.play().catch(() => {});
