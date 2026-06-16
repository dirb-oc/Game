import { get, getById } from "../Services/api";

export async function getStats() {
    return await get("stats");
}

export async function getStatsYear(year) {
    return await getById("stats", year);
}

export async function getStatsByYearMonth(year, month) {
    return await get(`stats/${year}/${month}`);
}