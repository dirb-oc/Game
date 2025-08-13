const DATA_BASE = "/data/";

export const loadWish = async (setStateFn) => {
  try {
    const response = await fetch(`${DATA_BASE}Deseados.json`);
    if (!response.ok) throw new Error("Error al cargar deseados");
    const data = await response.json();
    setStateFn(data);
  } catch (error) {
    console.error("Error desde el controlador:", error.message);
  }
};

export const createWish = async (data) => {
  const stored = JSON.parse(localStorage.getItem("deseados") || "[]");
  stored.push(data);
  localStorage.setItem("deseados", JSON.stringify(stored));
  return data; // simula que el backend respondió
};

export const updateWish = async (id, data) => {
  const stored = JSON.parse(localStorage.getItem("deseados") || "[]");
  const index = stored.findIndex(item => item.id === id);
  if (index !== -1) {
    stored[index] = { ...stored[index], ...data };
    localStorage.setItem("deseados", JSON.stringify(stored));
  }
  return data;
};
