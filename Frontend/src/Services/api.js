const API_URL = "http://192.168.1.13:8000";

export async function get(endpoint) {
    const response = await fetch(`${API_URL}/${endpoint}/`);

    if (!response.ok) { throw new Error("Error al obtener datos"); }

    return await response.json();
}

export async function getById(endpoint, id) {
    const response = await fetch(`${API_URL}/${endpoint}/${id}/`);

    if (!response.ok) { throw new Error("Error al obtener registro"); }

    return await response.json();
}

export async function post(endpoint, data) {

    const formData = new FormData();

    // Añadir todos los campos
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    const response = await fetch(
        `${API_URL}/${endpoint}/`,
        {
            method: "POST",
            body: formData, 
        }
    );

    return await response.json();
}

export async function patch(endpoint, id, data) {

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {

        if (value !== null && value !== undefined) {

            if (Array.isArray(value)) {
                value.forEach(item =>
                    formData.append(key, item)
                );
            } else {
                formData.append(key, value);
            }

        }
    });

    const response = await fetch(
        `${API_URL}/${endpoint}/${id}/`,
        {
            method: "PATCH",
            body: formData,
        }
    );

    const result = await response.json();

    console.log("STATUS:", response.status);
    console.log("RESPONSE:", result);

    return result;
}