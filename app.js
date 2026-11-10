// Personajes de Earth to Stella; descripciones resumidas del pitch bible de Mara
const PERSONAJES = [
  { id: "stella", nombre: "Stella", rol: "Protagonista · turista espacial", fondo: "#d6ead0",
    bocetos: [["img/port/stella-boceto.webp", "Boceto a lápiz de Stella"]],
    corto: "Una estrella octángula que llega a la Tierra como turista.",
    largo: "Siguió a la sonda Voyager hasta la Tierra, fascinada por la imperfección y la espontaneidad de la humanidad. Entusiasta, impulsiva, fan del jazz, del rock and roll y de la leche de chocolate (y de las vacas). Detrás de su alegría carga la culpa de haber dejado su hogar… y un secreto que podría traer el fin del mundo." },
  { id: "carter", nombre: "Carter Kepler", rol: "Descendiente de Cthulhu", fondo: "#cfe2de",
    bocetos: [["img/port/carter-v1.webp", "Primera versión de Carter Kepler, a lápiz"], ["img/port/boceto-02.webp", "Boceto a lápiz de Carter Kepler"]],
    corto: "Escritor sin editorial y “intelectual incomprendido”.",
    largo: "Juega golf, observa aves, actualiza Wikipedia y ordena sus cosas por color o en orden alfabético. Ninguna editorial lo publica por “aburrido”, así que se vuelve guía turístico de Stella y cuenta sus aventuras en un blog para ganar audiencia." },
  { id: "mothman", nombre: "Mothman", rol: "Repartidor de pizza", fondo: "#e2d7ec",
    corto: "Un hombre polilla de 3 metros con muy mala suerte.",
    largo: "Graduado en arquitectura, nocturno y relajado, nunca dura en un trabajo. Sus alas son demasiado flacas para volar, pero es la sensación de las fiestas. Hace de mediador entre Carter y Stella, y tiene un crush con la reportera Mary Bridge." },
  { id: "mary", nombre: "Mary Bridge", rol: "Reportera reptiliana", fondo: "#f2e2b6", src: "img/mary-color.webp",
    bocetos: [["img/port/boceto-19.webp", "Boceto a lápiz de Mary Bridge"]],
    corto: "Una reportera que quiere hacer justicia.",
    largo: "Intensa, inteligente y fiel creyente de la justicia, carga con el peso de reivindicar a su familia reptiliana. Quiere contar la historia de migración de Stella para por fin tener una nota importante en el noticiero." },
  { id: "crowley", nombre: "Crowley", rol: "El vecino de arriba", fondo: "#ffffff", boceto: true, src: "img/port/boceto-03.webp",
    corto: "El vecino de arriba… que no tiene parte de arriba.",
    largo: "Un par de piernas sin torso que no le impiden ser boxeador profesional. Fan de las teorías conspirativas y de los casos policiales sin resolver, baila tap a las 2 de la mañana, pero siempre te presta una taza de azúcar." },
  { id: "angreeman", nombre: "Mr. Angreeman", rol: "El único vecino humano", fondo: "#ffffff", boceto: true, src: "img/port/boceto-04.webp",
    corto: "El único vecino humano… y lo detesta.",
    largo: "Vive en un edificio lleno de criaturas y las odia por el ruido de su “amistad” y su “convivencia”. Con apenas 37 años, el único que le agrada es Carter, porque no hace ruido y, según él, “entiende su lugar”." },
  { id: "jesse", nombre: "Jesse Deville", rol: "Vecino de la torre Emily Park", fondo: "#ffffff", boceto: true, src: "img/port/boceto-jesse-e2s.webp",
    corto: "Cabeza de caballo y pequeñas alas de murciélago.",
    largo: "Ama las carreras, el pay de manzana con helado de vainilla y los terrones de azúcar. Su padre, muy pulcro y tradicional, quiere que sea abogado como él; lo único que comparten es su amor por la avena." },
  { id: "lilisquonks", nombre: "Lilisquonks", rol: "Nuevos residentes", fondo: "#f4d3dc",
    corto: "Criaturas que caben en la palma de la mano.",
    largo: "Una mezcla de liliputienses y squonks que vive en una máquina expendedora junto a la torre de departamentos. Son tan temerosos que, cuando se asustan, se derriten en sus propias lágrimas." },
  { id: "johnson", nombre: "Familia Johnson", rol: "Una familia (aparentemente) normal", fondo: "#dde3ee", foto: true,
    corto: "Hall, Norma, el pequeño Billy y su perro Spike.",
    largo: "Hall es alegre y tranquilo… y zurdo. Norma mide 2.5 metros, no tiene rostro aparente y hace un increíble pay de coco. El pequeño Billy sospecha que su mamá no es quien dice ser; su papá dice que ve demasiado internet." },
];

// Los personajes a color van en la rejilla; los secundarios, a lápiz, en su propia fila (solo en Earth to Stella)
const ficha = document.getElementById("ficha");
PERSONAJES.forEach(p => {
  const destino = document.getElementById(p.boceto ? "secundarios" : "rejilla");
  if (!destino) return;
  const b = document.createElement("button");
  b.type = "button";
  b.className = "personaje" + (p.foto ? " personaje--foto" : "") + (p.boceto ? " personaje--boceto" : "");
  b.style.setProperty("--color", p.fondo);
  b.setAttribute("aria-label", `${p.nombre}: ${p.corto} Ver ficha`);
  const src = p.src || `img/${p.id}.${p.foto ? "jpg" : "webp"}`;
  b.innerHTML = `<span class="personaje__marco"><img src="${src}" alt="" loading="lazy"></span>
    <span class="personaje__nombre">${p.nombre}</span>
    <span class="personaje__rol">${p.rol}</span>`;
  b.onclick = () => abrirFicha(p, src);
  destino.appendChild(b);
});

function abrirFicha(p, src) {
  const marco = ficha.querySelector(".ficha__imagen");
  const img = document.createElement("img");
  img.src = src;
  img.alt = `${p.nombre}, personaje de Earth to Stella`;
  marco.replaceChildren(img);
  // Versiones a lápiz, de la más antigua a la más reciente, antes del color
  const bocetos = (p.bocetos || []).map(([ruta, texto]) => {
    const boceto = document.createElement("img");
    boceto.src = ruta;
    boceto.alt = texto;
    boceto.className = "ficha__boceto";
    return boceto;
  });
  marco.prepend(...bocetos);
  marco.style.setProperty("--n", bocetos.length + 1);
  marco.classList.toggle("ficha__imagen--pareja", bocetos.length > 0);
  marco.classList.toggle("ficha__imagen--tres", bocetos.length > 1);
  marco.style.setProperty("--color", p.fondo);
  marco.classList.toggle("ficha__imagen--foto", !!p.foto);
  ficha.querySelector(".ficha__rol").textContent = p.rol;
  ficha.querySelector("#ficha-nombre").textContent = p.nombre;
  ficha.querySelector(".ficha__descripcion").textContent = p.largo;
  ficha.showModal();
}
const cerrarFicha = () => { if (ficha.open) ficha.close(); };
ficha.querySelector(".ficha__cerrar").onclick = cerrarFicha;
ficha.addEventListener("click", e => { if (e.target === ficha) cerrarFicha(); });

// Galerías: miniatura en la rejilla y la imagen grande en el visor, con anterior/siguiente
const visor = document.getElementById("visor");
const mini = p => p.mini || `img/port/${p.id}-mini.webp`;
let lista = [], actual = 0;
document.querySelectorAll("[data-galeria]").forEach(cont => {
  const piezas = GALERIA[cont.dataset.galeria];
  // "entera": la pieza se ve completa dentro del recuadro (bocetos, model sheets); si no, lo llena
  const entera = cont.dataset.ajuste === "entera";
  piezas.forEach((p, i) => {
    const b = document.createElement("button");
    b.type = "button";
    if (p.bocetos) {
      const lados = p.bocetos.map(x => [x, "Boceto"]).concat([[p.color, "Color"]]);
      b.className = "pareja" + (lados.length > 2 ? " pareja--tres" : "");
      b.style.setProperty("--n", lados.length);
      b.setAttribute("aria-label", `Ampliar: ${p.titulo}, bocetos y color`);
      b.innerHTML = lados.map(([x, etiqueta]) =>
        `<span class="pareja__lado"><img src="${mini(x)}" alt="" loading="lazy"><span class="pareja__etiqueta">${etiqueta}</span></span>`).join("")
        + `<span class="pareja__titulo">${p.titulo}</span>`;
      b.onclick = () => abrirVisor(piezas, i);
      cont.appendChild(b);
      return;
    }
    b.className = "pieza" + (entera ? " pieza--entera" : "");
    b.setAttribute("aria-label", `Ampliar: ${p.titulo}`);
    b.innerHTML = `<img src="${mini(p)}" alt="${p.titulo}" loading="lazy"><span class="pieza__titulo">${p.titulo}</span>`;
    b.onclick = () => abrirVisor(piezas, i);
    cont.appendChild(b);
  });
});
function grande(p) {
  const img = document.createElement("img");
  img.src = p.src || `img/port/${p.id}.webp`;
  img.alt = p.titulo;
  img.width = p.w;
  img.height = p.h;
  return img;
}
function mostrar(i) {
  actual = (i + lista.length) % lista.length;
  const p = lista[actual], marco = visor.querySelector(".visor__imagen");
  // Una pareja se ve completa: el boceto a la izquierda (arriba en celular) y el color al lado
  const imagenes = p.bocetos ? [...p.bocetos, p.color].map(grande) : [grande(p)];
  marco.replaceChildren(...imagenes);
  marco.style.setProperty("--n", imagenes.length);
  marco.classList.toggle("visor__imagen--pareja", imagenes.length > 1);
  visor.querySelector(".visor__titulo").textContent = p.titulo;
  visor.querySelector(".visor__contador").textContent = lista.length > 1 ? `${actual + 1} / ${lista.length}` : "";
  visor.classList.toggle("visor--uno", lista.length < 2);
}
function abrirVisor(piezas, i) {
  lista = piezas;
  mostrar(i);
  visor.showModal();
}
const cerrarVisor = () => { if (visor.open) visor.close(); };
visor.querySelector(".visor__cerrar").onclick = cerrarVisor;
visor.querySelector(".visor__boton--prev").onclick = () => mostrar(actual - 1);
visor.querySelector(".visor__boton--next").onclick = () => mostrar(actual + 1);
visor.addEventListener("click", e => { if (e.target === visor) cerrarVisor(); });
visor.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") mostrar(actual - 1);
  if (e.key === "ArrowRight") mostrar(actual + 1);
});

// Portada: carrusel de ilustraciones a pantalla completa (cambia solo cada 6 s, salvo si se pide menos movimiento)
const portada = document.querySelector(".portada");
if (portada) {
  const destacadas = ["metro", "halloween", "lobo", "zoey", "model-sheet-stella", "ponis"];
  const puntos = portada.querySelector(".portada__puntos");
  const slides = destacadas.map((id, i) => {
    const p = Object.values(GALERIA).flat().map(x => x.color || x).find(x => x.id === id);
    const slide = document.createElement("div");
    slide.className = "portada__slide" + (i === 0 ? " activa" : "");
    slide.innerHTML = `<img src="img/port/${id}.webp" alt="${p.titulo}" ${i === 0 ? "" : 'loading="lazy"'}>`;
    portada.prepend(slide);
    const punto = document.createElement("button");
    punto.type = "button";
    punto.setAttribute("aria-label", `Ver ${p.titulo}`);
    punto.onclick = () => irA(i);
    puntos.appendChild(punto);
    return slide;
  });
  let visible = 0, reloj = null;
  const irA = i => {
    visible = (i + slides.length) % slides.length;
    slides.forEach((s, j) => s.classList.toggle("activa", j === visible));
    [...puntos.children].forEach((b, j) => b.setAttribute("aria-current", j === visible ? "true" : "false"));
  };
  const reiniciar = () => {
    clearInterval(reloj);
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) reloj = setInterval(() => irA(visible + 1), 6000);
  };
  portada.querySelector(".portada__flecha--prev").onclick = () => { irA(visible - 1); reiniciar(); };
  portada.querySelector(".portada__flecha--next").onclick = () => { irA(visible + 1); reiniciar(); };
  irA(0);
  reiniciar();
}

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
