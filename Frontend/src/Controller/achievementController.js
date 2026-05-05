export async function postAchievements({ gameId, totalLogros }) {
  const response = await fetch("http://192.168.1.13:8000/logros/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      game: gameId,
      total_logros: totalLogros,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}
