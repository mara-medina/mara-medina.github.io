const FPS = 30;
const $ = id => document.getElementById(id);
const video = $("video"), sala = document.querySelector(".sala"), btnSonido = $("btn-sonido");

const mmss = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const timecode = s => {
  const f = Math.floor(s * FPS);
  const p = n => String(n).padStart(2, "0");
  return `${p(Math.floor(f / (FPS * 3600)))}:${p(Math.floor(f / (FPS * 60)) % 60)}:${p(Math.floor(f / FPS) % 60)}:${p(f % FPS)}`;
};

// Demo reel: arranca solo y sin sonido
function actualizar() {
  $("tc").textContent = timecode(video.currentTime || 0);
  $("clip-tc").textContent = mmss(video.currentTime || 0);
}
function alternar() { video.paused ? video.play().catch(() => {}) : video.pause(); }

video.addEventListener("loadedmetadata", () => { $("clip-dur").textContent = mmss(video.duration); });
video.addEventListener("timeupdate", actualizar);
video.addEventListener("play", () => { sala.classList.add("reproduciendo"); pausarProyectos(); });
video.addEventListener("pause", () => sala.classList.remove("reproduciendo"));
video.addEventListener("click", alternar);
$("btn-play").addEventListener("click", alternar);
$("play-grande").addEventListener("click", () => video.play().catch(() => {}));
btnSonido.addEventListener("click", () => {
  video.muted = !video.muted;
  btnSonido.setAttribute("aria-pressed", !video.muted);
  btnSonido.textContent = video.muted ? "Activar sonido" : "Sonido activado";
  if (!video.muted && video.paused) video.play().catch(() => {});
});

// Proyectos: cada uno con su reproductor; solo suena uno a la vez
const proyectos = [...document.querySelectorAll(".proyecto")];
function pausarProyectos(excepto) {
  proyectos.forEach(p => { const v = p.querySelector("video"); if (v !== excepto && !v.paused) v.pause(); });
}
proyectos.forEach(p => {
  const v = p.querySelector("video");
  const barra = p.querySelector(".proyecto__avance span");
  const alternarProyecto = () => (v.paused ? v.play().catch(() => {}) : v.pause());
  p.querySelector(".proyecto__play").addEventListener("click", alternarProyecto);
  v.addEventListener("click", alternarProyecto);
  v.addEventListener("play", () => {
    p.classList.add("reproduciendo");
    pausarProyectos(v);
    if (!video.paused) video.pause();
  });
  v.addEventListener("pause", () => p.classList.remove("reproduciendo"));
  v.addEventListener("timeupdate", () => { barra.style.width = `${(v.currentTime / v.duration) * 100 || 0}%`; });
  v.addEventListener("ended", () => { v.currentTime = 0; barra.style.width = "0"; });
});

if (!matchMedia("(prefers-reduced-motion: reduce)").matches) video.play().catch(() => {});
