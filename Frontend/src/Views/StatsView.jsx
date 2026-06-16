import { MdOutlineAttachMoney, MdAccessTime } from "react-icons/md";
import { loadStats } from "../Controllers/StatsController";
import { formatPrice } from "../Services/formatters"
import { useEffect, useState } from "react";
import { FaGamepad } from "react-icons/fa";
import { Link } from "react-router-dom";
import CollectionDistribution from "../Components/Stats/CollectionDistribution";
import PriceDistribution from "../Components/Stats/PriceDistribution"
import SplitDistribution from "../Components/Stats/SplitDistribution"
import Achievements from "../Components/Stats/Achievements"
import YearsSection from "../Components/Stats/YearsSection"
import ValuePerHour from "../Components/Stats/ValuePerHour"
import StatCard from "../Components/Stats/StatCard";
import TopGames from "../Components/Stats/TopGames"
import Loading from "../Components/Loading"

function StatsView() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { loadStats(setStats, setLoading, setError); }, []);

    if (loading) return <Loading text="Cargando estadísticas..." />;
    if (error) return <h2>{error}</h2>;

    return (
        <div className="Base">
            <h1 className="Title">Estadísticas</h1>
            <p className="SubTitle">Analisis de la <Link to="/" className="LinkCollect">Colección</ Link> de juegos</p>

            <h2 className="section-title"><span className="section-title-bar" />Resumen General</h2>

            <div className="stats-grid">
                <StatCard
                    title="Total Juegos"
                    value={stats.stats.library.total}
                    subtitle={`${stats.stats.activity.terminados} Terminados`}
                    icon={<FaGamepad />}
                    color={"Azul"}
                />

                <StatCard
                    title="Horas Jugadas"
                    value={`${stats.stats.activity.horas}h`}
                    subtitle={stats.stats.activity.dias}
                    icon={<MdAccessTime />}
                    color={"Morado"}
                />

                <StatCard
                    title="Precio Total"
                    value={formatPrice(stats.stats.library.precio)}
                    subtitle={formatPrice(stats.averages.precio)}
                    icon={<MdOutlineAttachMoney />}
                    color={"Verde"}
                />
            </div>

            <div className="Flex">
                <YearsSection years={stats.por_anio} />

                <CollectionDistribution
                    totalGames={stats.stats.library.total}
                    started={stats.stats.activity.comenzados}
                    completed={stats.stats.activity.terminados}
                />
            </div>

            <h2 className="section-title"><span className="section-title-bar" />Top Juegos</h2>

            <TopGames top_games={stats.top_games} dis={"Top5"} />
            <Achievements data={stats.logros} />

            <h2 className="section-title"><span className="section-title-bar" />Analisis de Precios</h2>
            
            <div className="cost-grid">
                <PriceDistribution data={stats.distribucion} average={stats.averages.precio} />
                <ValuePerHour data={stats.por_Horas} average={stats.averages.prom_hora} />
            </div>

            <div className="cost-grid">

                <SplitDistribution
                    title="Biblioteca Aprovechada"
                    data={[
                        {
                            name: "Jugados",
                            value: stats.stats.activity.precio_jugados,
                            prefix: "$",
                            color: "var(--Cash)"
                        },
                        {
                            name: "Sin jugar",
                            value: (stats.stats.library.precio)-(stats.stats.activity.precio_jugados),
                            prefix: "$",
                            color: "var(--Rojo)"
                        }
                    ]}
                />
                <SplitDistribution
                    title="Horas por Equipo"
                    data={[
                        {
                            name: stats.horas_pc[0].nombre,
                            value: stats.horas_pc[0].horas,
                            suffix: "h",
                            color: "#a9b6b2"
                        },
                        {
                            name: stats.horas_pc[1].nombre,
                            value: stats.horas_pc[1].horas,
                            suffix: "h",
                            color: "#292b50"
                        }
                    ]}
                />

            </div>
            <div className="last">
                <span>Tiempo: {stats.stats.activity.tiempo_activo}</span>
                <span>Almacenamiento Total: {stats.stats.library.almacenamiento} GB</span>
            </div>
        </div>
    );
}

export default StatsView;