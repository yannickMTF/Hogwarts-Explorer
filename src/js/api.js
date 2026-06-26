const BASE_URL = "https://hp-api.onrender.com/api/characters";
export const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1547756536-cde3673fa2e5?w=400";

export async function getAllCharacters() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Error de conexión con el castillo.");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCharacterById(id) {
  try {
    const response = await fetch(
      `https://hp-api.onrender.com/api/character/${id}`,
    );
    if (!response.ok) throw new Error("Personaje no encontrado.");
    const data = await response.json();
    // La API devuelve un array con un único elemento cuando buscas por ID
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
