const DATA_BASE = "/Data/";

import { getLibraryGames } from "../Models/libraryModel";

// Carga juegos desde JSON estático
export const loadGames = async (setStateFn) => {
  try {
    const data = await getLibraryGames(); // Ya lee Libreria.json
    setStateFn(data);
  } catch (error) {
    console.error("Error desde el controlador:", error.message);
  }
};

// Simulación: guardar en localStorage
export const createGame = async (gameData) => {
  const stored = JSON.parse(localStorage.getItem("libreria") || "[]");
  stored.push(gameData);
  localStorage.setItem("libreria", JSON.stringify(stored));
  return gameData;
};

// Obtener juego por ID desde JSON estático
export const getGameById = async (id) => {
  const res = await fetch(`${DATA_BASE}Libreria.json`);
  if (!res.ok) throw new Error("No se pudo obtener el juego");
  const games = await res.json();
  return games.find((g) => g.id == id);
};

// Simulación de actualización
export const updateGame = async (id, data) => {
  const stored = JSON.parse(localStorage.getItem("libreria") || "[]");
  const index = stored.findIndex((g) => g.id == id);
  if (index !== -1) {
    stored[index] = { ...stored[index], ...data };
    localStorage.setItem("libreria", JSON.stringify(stored));
  }
  return data;
};
