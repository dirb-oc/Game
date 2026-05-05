const API_BASE = "http://192.168.1.13:8000/libreria/";

export const getLibraryGames = async () => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Error al obtener los juegos");
  return await res.json();
};
