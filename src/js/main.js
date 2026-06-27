// Elementos del DOM
const grid = document.getElementById("characters-grid");
const searchInput = document.querySelector(".search-container input");
const roleSelect = document.querySelector(".search-container select");
const houseButtons = document.querySelectorAll(".house-buttons .Btn, .Btn");

// URL oficial de la API (HTTPS)
const API_URL = "https://hp-api.onrender.com/api/characters";
const PLACEHOLDER_IMG = "https://placehold.co/240x280?text=No+Image";

let allCharacters = [];
let selectedHouse = "all";

// Inicializar la aplicación
async function init() {
  try {
    const res = await fetch(API_URL);
    allCharacters = await res.json();

    renderCharacters(allCharacters);
    setupEventListeners();
  } catch (err) {
    console.error("Error al conectar con la API:", err);
    if (grid) {
      grid.innerHTML =
        '<p class="loader">Personaje oculto bajo la capa de invisibilidad.</p>';
    }
  }
}

// Función de renderizado para las tarjetas
function renderCharacters(list) {
  if (!grid) return;
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
                <a href="./detalle.html?id=${char.id}" class="btn-detail">Ver Perfil</a>
            </div>
        `;
    grid.appendChild(card);
  });
}

// Procesar y combinar filtros (Buscador + Casa + Rol)
function applyFilters() {
  let filtered = [...allCharacters];

  // Filtro por Casa
  if (selectedHouse !== "all") {
    filtered = filtered.filter(
      (char) =>
        char.house && char.house.toLowerCase() === selectedHouse.toLowerCase(),
    );
  }

  // Filtro por Buscador de texto
  if (searchInput) {
    const query = searchInput.value.toLowerCase().trim();
    if (query) {
      filtered = filtered.filter((char) =>
        char.name.toLowerCase().includes(query),
      );
    }
  }

  // Filtro por Rol (Estudiante / Profesor)
  if (roleSelect) {
    const roleValue = roleSelect.value;
    if (roleValue === "students") {
      filtered = filtered.filter((char) => char.hogwartsStudent === true);
    } else if (roleValue === "staff") {
      filtered = filtered.filter((char) => char.hogwartsStaff === true);
    }
  }

  renderCharacters(filtered);
}

// Configurar los escuchadores de los botones y selectores
function setupEventListeners() {
  houseButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      houseButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // 🧙‍♂️ SOLUCIÓN: Buscamos la palabra clave textualmente sin importar el orden de las clases
      const clases = Array.from(btn.classList).map((c) => c.toLowerCase());

      if (clases.includes("gryffindor")) {
        selectedHouse = "gryffindor";
      } else if (clases.includes("slytherin")) {
        selectedHouse = "slytherin";
      } else if (clases.includes("ravenclaw")) {
        selectedHouse = "ravenclaw";
      } else if (clases.includes("hufflepuff")) {
        selectedHouse = "hufflepuff";
      } else {
        selectedHouse = "all"; // Si es el botón 'all' o no coincide ninguno
      }

      applyFilters();
    });
  });

  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (roleSelect) roleSelect.addEventListener("change", applyFilters);
}

init();
