import { getStats, getStatsYear, getStatsMonth} from "../Models/StatsModel";

export const loadStats = async (setStateFn) => {
  try {
    const data = await getStats();
    setStateFn(data);
  } catch (error) {
    console.error("Error desde el controlador:", error.message);
  }
};

export const loadStatsYear = async (year, setStateFn) => {
  try {
    const data = await getStatsYear(year);
    setStateFn(data);
  } catch (error) {
    console.error("Error desde el controlador:", error.message);
  }
};

export const loadStatsMonth = async (year, month, setStateFn) => {
  try {
    const data = await getStatsMonth(year, month);
    setStateFn(data);
  } catch (error) {
    console.error("Error desde el controlador:", error.message);
  }
};
