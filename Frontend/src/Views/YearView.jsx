import { MdOutlineAttachMoney, MdAccessTime } from "react-icons/md";
import { loadYear } from "../Controllers/StatsController";
import { formatPrice } from "../Services/formatters"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaGamepad } from "react-icons/fa";
import { Link } from "react-router-dom";
import SplitDistribution from "../Components/Stats/SplitDistribution"
import YearHighlights from "../Components/Stats/YearHighlights"
import MonthStats from "../Components/Stats/MonthStats";
import StatCard from "../Components/Stats/StatCard";
import TopGames from "../Components/Stats/TopGames"
import Loading from "../Components/Loading";

function YearView() {

    const { year } = useParams();
    const [stats, setstats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { loadYear(year, setstats, setLoading, setError); }, [year]);

    if (loading) { return <Loading text="Cargando Juego..." />; }

    if (error) { return <h2>{error}</h2>; }

    return (
        <div className="Base">
            <h1 className="Title">Estadísticas</h1>
            <p className="SubTitle">Analisis de la <Link to="/stats" className="LinkStats">Estadisticas</ Link> de juegos {year}</p>

            <h2 className="section-title"><span className="section-title-bar" />Resumen General</h2>

            <div className="stats-grid">
                <StatCard
                    title="Total Juegos"
                    value={stats.totals.jugados}
                    subtitle={`${stats.totals.juegos} Total`}
                    icon={<FaGamepad />}
                    color={"Azul"}
                />

                <StatCard
                    title="Horas Jugadas"
                    value={`${stats.totals.horas}h`}
                    subtitle={stats.totals.tiempo}
                    icon={<MdAccessTime />}
                    color={"Morado"}
                />

                <StatCard
                    title="Precio Total"
                    value={formatPrice(stats.totals.precio)}
                    subtitle={formatPrice(stats.totals.pro_precio)}
                    icon={<MdOutlineAttachMoney />}
                    color={"Verde"}
                />
            </div>
            <div className="cost-grid">

                <SplitDistribution
                    title="Distribucion por Antiguedad"
                    data={[
                        {
                            name: "Juegos Nuevos",
                            value: stats.distribucion.juegos.nuevos,
                            prefix: "",
                            color: "var(--Cash)"
                        },
                        {
                            name: "Juego Viejos",
                            value: stats.distribucion.juegos.viejos,
                            prefix: "",
                            color: "var(--Azul)"
                        }
                    ]}
                />
                <SplitDistribution
                    title="Horas por Antiguedad"
                    data={[
                        {
                            name: "Juegos Nuevos",
                            value: stats.distribucion.horas.nuevos,
                            suffix: "h",
                            color: "var(--Cash)"
                        },
                        {
                            name: "Juegos Viejos",
                            value: stats.distribucion.horas.viejos,
                            suffix: "h",
                            color: "var(--Azul)"
                        }
                    ]}
                />

            </div>
            <h2 className="section-title"><span className="section-title-bar" />Top Games</h2>
            <TopGames top_games={stats.top_games} dis={"Top3"} />
            <YearHighlights data={stats.highlights} />

            <h2 className="section-title"><span className="section-title-bar" />Meses</h2>
            <MonthStats year={year} data={stats.meses} />

            <div className="last">
                <span>Promedio: {stats.totals.pro_horas_mes} Horas y {stats.totals.pro_juegos_mes} juegos</span>
                <span>Almacenamiento Total: {stats.totals.almacenamiento} GB</span>
            </div>

        </div>
    );
}

export default YearView;