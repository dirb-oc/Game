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
    const formData = new FormData();

    // Añadir todos los campos
    Object.entries(gameData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    const response = await fetch("http://localhost:8000/libreria/", {
      method: "POST",
      body: formData, 
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error en la respuesta:", errorData);
      throw new Error("Error al crear el juego");
    }

    return await response.json();
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
    body: data, // 👈 FormData directamente
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err);
  }

  return response.json();
};

export async function setFechaTerminado({ id, fecha }) {
  const res = await fetch(`http://localhost:8000/libreria/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fecha_terminado: fecha,
    }),
  });

  if (!res.ok) {
    throw new Error("Error al actualizar fecha");
  }

  return res.json();
};
