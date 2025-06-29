import { getLibraryGames } from "../Models/libraryModel";

export const loadGames = async (setStateFn) => {
  try {
    const data = await getLibraryGames();
    setStateFn(data);
  } catch (error) {
    console.error("Error desde el controlador:", error.message);
  }
};

export const createGame = async (gameData) => {
  try {
    const response = await fetch("http://localhost:8000/libreria/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error en la respuesta:", errorData);
      throw new Error("Error al crear el juego");
    }
    const newGame = await response.json();
    return newGame;
  } catch (error) {
    console.error("Error al enviar juego:", error);
    throw error;
  }
};

export const getGameById = async (id) => {
  const response = await fetch(`http://localhost:8000/libreria/${id}/`);
  if (!response.ok) throw new Error("No se pudo obtener el juego");
  return await response.json();
};

export const updateGame = async (id, data) => {
  const response = await fetch(`http://localhost:8000/libreria/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el juego");
  }

  return await response.json();
};
