export async function postHours({ gameId, hours }) {

  const response = await fetch(
    `http://192.168.1.13:8000/sesiones/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
       game: gameId,        // 👈 nombre correcto
        total_horas: hours, 
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return await response.json();
}
