const DATA_BASE = "/Data/";

export const loadGenres = async (setGenres) => {
  try {
    const response = await fetch(`${DATA_BASE}Generos.json`);
    if (!response.ok) throw new Error("Error al cargar géneros");
    const data = await response.json();
    setGenres(data);
  } catch (error) {
    console.error("Error al obtener géneros:", error);
  }
};