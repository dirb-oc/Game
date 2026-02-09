const API_BASE = "http://127.0.0.1:8000/stats/";

export const getStats = async () => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Error al obtener las Stats");
  return await res.json();
};

export const getStatsYear = async (year) => {
  const response = await fetch(`${API_BASE}${year}/`);
  if (!response.ok) throw new Error("No se pudo obtener el año");
  return await response.json();
};

export const getStatsMonth = async (year, month) => {
  const response = await fetch(`${API_BASE}${year}/${month}`);
  if (!response.ok) throw new Error("No se pudo obtener el mes");
  return await response.json();
};