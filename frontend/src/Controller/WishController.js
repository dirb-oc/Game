export const loadWish = async (setStateFn) => {
  try {
    const response = await fetch('http://localhost:8000/deseados/');
    const data = await response.json();
    setStateFn(data);
  } catch (error) {
    console.error("Error desde el controlador:", error.message);
  }
};

export const createWish = async (data) => {
  try {
    const response = await fetch("http://localhost:8000/deseados/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al crear el juego deseado");
    return await response.json();
  } catch (error) {
    console.error("Error en createWish:", error.message);
    throw error;
  }
};

export const updateWish = async (id, data) => {
  try {
    const response = await fetch(`http://localhost:8000/deseados/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al actualizar el juego deseado");
    return await response.json();
  } catch (error) {
    console.error("Error en updateWish:", error.message);
    throw error;
  }
};
