const API_BASE = "http://127.0.0.1:8000/libreria/";

export const getLibraryGames = async () => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Error al obtener los juegos");
  return await res.json();
};