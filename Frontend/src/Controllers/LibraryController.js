import { listLibrary, getGame, listGenres, postGame, postHours, postAchievements, patchGame } from "../Models/LibraryModel";

export async function loadLibrary(setGames, setLoading, setError) {
    try {
        setLoading(true);

        const data = await listLibrary();

        setGames(data);
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
}

export async function loadGame(id, setGame, setLoading, setError) {
    try {
        setLoading(true);

        const data = await getGame(id);

        setGame(data);

    } finally {
        setLoading(false);
    }
}

export async function UpdateGame(id, data) {
    try {
        const response = await patchGame(id, data);

        if (response?.error) {
            throw new Error(response.error);
        }

        return response;

    } catch (error) {
        console.error("Error al actualizar juego:", error);
        throw error;
    }
}

export async function loadGenres(setGenres, setLoading, setError) {
    try {
        setLoading(true);

        const data = await listGenres();

        setGenres(data);
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
}

export async function createGame(data) {
    return await postGame(data);
}

export async function createHours(data) {
    return await postHours(data);
}

export async function createAchievements(data) {
    return await postAchievements(data);
}
