import { getStats, getStatsYear, getStatsByYearMonth } from "../Models/StatsModel";

export async function loadStats( setStats, setLoading, setError ) {
    try {
        setLoading(true);
        const data = await getStats();
        setStats(data);
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
}

export async function loadYear(year,setYear,setLoading,setError) {
    try {
        setLoading(true);
        const data = await getStatsYear(year);
        setYear(data);
    } catch {
        setError("Error cargando juego");
    } finally {
        setLoading(false);
    }
}

export async function loadMonth(year, month, setMonth,setLoading, setError) {
    try {
        setLoading(true);
        const data = await getStatsByYearMonth(year, month);
        setMonth(data);
    } catch {
        setError("Error cargando juego");
    } finally {
        setLoading(false);
    }
}