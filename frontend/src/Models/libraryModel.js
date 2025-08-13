const DATA_BASE = "/Data/";

export const getLibraryGames = async () => {
  const res = await fetch(`${DATA_BASE}Libreria.json`);
  if (!res.ok) throw new Error("Error al obtener los juegos");
  return await res.json();
};