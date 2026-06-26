// src/js/detail.js
import { getCharacterById, PLACEHOLDER_IMG } from "./api.js";

const detailContainer = document.getElementById("detail-container");

// 🧙‍♂️ Diccionario mágico actualizado con especies, linajes, varitas y PATRONUS
const traducciones = {
  // Especies
  human: "Humano",
  ghost: "Fantasma",
  "half-giant": "Semi-Gigante",
  werewolf: "Hombre Lobo",
  centaur: "Centauro",
  "house-elf": "Elfo Doméstico",
  goblin: "Duende",

  // Linajes / Ancestros
  "pure-blood": "Sangre Pura",
  "half-blood": "Sangre Mestiza",
  muggleborn: "Hijo de Muggles",
  muggle: "Muggle",
  squib: "Squib",

  // Núcleos de varitas
  "phoenix feather": "Pluma de Fénix",
  "dragon heartstring": "Fibra de Corazón de Dragón",
  "unicorn hair": "Pelo de Unicornio",

  // Maderas de varitas
  holly: "Acebo",
  vine: "Vid",
  willow: "Sauce",
  hawthorn: "Espino",
  yew: "Tejo",
  ash: "Fresno",

  // 🦌 TRADUCCIONES DE PATRONUS
  stag: "Ciervo",
  otter: "Nutria",
  "jack russell terrier": "Perro Jack Russell Terrier",
  doe: "Cierva",
  hare: "Liebre",
  "doe/hare": "Cierva / Liebre",
  wolf: "Lobo",
  weasel: "Comadreja",
  lynx: "Lince",
  phoenix: "Fénix",
  goat: "Cabra",
  swan: "Cisne",
  fox: "Zorro",
  horse: "Caballo",
  cat: "Gato",
  "non-corporeal": "Incorpóreo (Sin forma física)",
  none: "No posee",
};

// Función auxiliar que busca en el diccionario o devuelve el texto original capitalizado
function traducir(texto) {
  if (!texto || texto.toLowerCase() === "none" || texto.trim() === "")
    return "No posee / Desconocido";
  const textoClean = texto.toLowerCase().trim();

  // Si está en nuestro diccionario, lo devuelve traducido
  if (traducciones[textoClean]) {
    return traducciones[textoClean];
  }

  // Si no está en el diccionario, le pone la primera letra en mayúscula para que quede prolijo
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

async function loadDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    detailContainer.innerHTML =
      '<p class="loader">Hechizo de rastreo fallido (Falta ID).</p>';
    return;
  }

  detailContainer.innerHTML =
    '<div class="loader">Abriendo las puertas del Gran Comedor... 🏰</div>';
  const char = await getCharacterById(id);

  if (!char) {
    detailContainer.innerHTML =
      '<p class="loader" style="color:red;">Personaje oculto bajo la capa de invisibilidad.</p>';
    return;
  }

  const img = char.image ? char.image : PLACEHOLDER_IMG;

  // Traducimos todos los campos clave
  const especieTraducida = traducir(char.species);
  const linajeTraducido = traducir(char.ancestry);
  const patronusTraducido = traducir(char.patronus);

  // Tratamiento para la Varita
  const maderaVarita = char.wand?.wood ? traducir(char.wand.wood) : "N/A";
  const nucleoVarita = char.wand?.core ? traducir(char.wand.core) : "";
  const textoVarita = char.wand?.wood
    ? `Madera de ${maderaVarita}${nucleoVarita ? ` con núcleo de ${nucleoVarita}` : ""}`
    : "Desconocida";

  detailContainer.innerHTML = `
        <div class="detail-card">
            <div class="detail-img">
                <img src="${img}" alt="${char.name}">
            </div>
            <div class="detail-info">
                <h2>${char.name}</h2>
                
                <div class="magic-divider">
                    <div class="magic-line"></div>
                    <div class="magic-symbol">⚡</div>
                    <div class="magic-line"></div>
                </div>

                <div class="info-grid">
                    <div class="info-item">
                        <label>Casa</label>
                        <span>${char.house || "Sin Casa / Desconocida"}</span>
                    </div>
                    <div class="info-item">
                        <label>Especie</label>
                        <span>${especieTraducida}</span>
                    </div>
                    <div class="info-item">
                        <label>Patronus</label>
                        <span>${patronusTraducido} ✨</span>
                    </div>
                    <div class="info-item">
                        <label>Varita Mágica</label>
                        <span>${textoVarita}</span>
                    </div>
                    <div class="info-item">
                        <label>Linaje de Sangre</label>
                        <span>${linajeTraducido}</span>
                    </div>
                    <div class="info-item">
                        <label>Interpretado por</label>
                        <span>${char.actor || "N/A"}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", loadDetail);
