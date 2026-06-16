import { get, getById, post, patch } from "../Services/api";

export async function listLibrary() {
    return await get("libreria");
}

export async function getGame(id) {
    return await getById("libreria", id);
}

export async function postGame(data) {
    return await post("libreria", data);
}

export async function patchGame(id, data) {
    return await patch("libreria", id, data);
}

export async function listGenres() {
    return await get("generos");
}

export async function postHours(data) {
    return await post("sesiones", data);
}

export async function postAchievements(data) {
    return await post("logros", data);
}