import { getAllCharacters, PLACEHOLDER_IMG } from "./api.js";

let characters = [];
let activeHouse = "all"; // Estado del filtro de casa

const grid = document.getElementById("characters-grid");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const messageContainer = document.getElementById("message-container");
const houseButtons = document.querySelectorAll(".btn-house");

async function init() {
  messageContainer.innerHTML =
    '<div class="loader">Lanzando "Accio Datos"... 🪄</div>';
  const data = await getAllCharacters();

  if (!data) {
    messageContainer.innerHTML =
      '<p class="loader" style="color:red;">El giratiempo falló. API caída.</p>';
    return;
  }

  messageContainer.innerHTML = "";
  characters = data;
  renderCharacters(characters);
  setupEvents();
}

function renderCharacters(list) {
  grid.innerHTML = "";
  if (list.length === 0) {
    grid.innerHTML =
      '<p class="loader">Ningún mago o bruja cumple las condiciones.</p>';
    return;
  }

  list.forEach((char) => {
    const card = document.createElement("div");
    card.className = "card";
    const img = char.image ? char.image : PLACEHOLDER_IMG;

    card.innerHTML = `
            <div class="card-img-container">
                <img src="${img}" alt="${char.name}" loading="lazy">
            </div>
            <div class="card-body">
                <h3>${char.name}</h3>
                <span class="btn-house ${char.house ? char.house.toLowerCase() : ""}" style="pointer-events: none; padding: 0.2rem 1rem; font-size:0.8rem;">
                    ${char.house || "Sin Casa"}
                </span>
                <a href=/detalle.html?id=${char.id}" class="btn-detail">Ver Perfil</a>
            </div>
        `;
    grid.appendChild(card);
  });
}

function filterAndSort() {
  let result = [...characters];

  // 1. Filtro por barra de búsqueda
  const text = searchInput.value.toLowerCase().trim();
  if (text) {
    result = result.filter((char) => char.name.toLowerCase().includes(text));
  }

  // 2. Filtro por Botón de Casa Activo
  if (activeHouse !== "all") {
    result = result.filter((char) => char.house === activeHouse);
  }

  // 3. Ordenar Alfabéticamente de A-Z o Z-A
  const sortValue = sortSelect.value;
  if (sortValue === "asc") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortValue === "desc") {
    result.sort((a, b) => b.name.localeCompare(a.name));
  }

  renderCharacters(result);
}

function setupEvents() {
  searchInput.addEventListener("input", filterAndSort);
  sortSelect.addEventListener("change", filterAndSort);

  // Lógica para alternar clases activas en los botones de casas
  houseButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      houseButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeHouse = btn.getAttribute("data-house");
      filterAndSort();
    });
  });
}

document.addEventListener("DOMContentLoaded", init);
