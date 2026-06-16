import { loadMonth } from "../../Controllers/StatsController";
import { useEffect, useState } from "react";
import { FaClock, FaTrophy } from "react-icons/fa";

import "./MonthModal.css";

function MonthModal({ year, data }) {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadMonth(year, data.month, setStats, setLoading, setError);
    }, [year, data.month]);

    if (loading) return <></>;
    if (error) return <h2>{error}</h2>;

    return (
        <>

            <div className="month-header">

                <div>
                    <span className="month-label">MES {data.month}</span>
                    <h2>{data.mes}</h2>
                </div>

                <div className="month-totals">

                    <div>
                        <FaClock />
                        <span>{stats.horas} h</span>
                    </div>

                    <div>
                        <FaTrophy />
                        <span>{stats.logros} logros</span>
                    </div>

                </div>

            </div>

            <div className="month-games">

                {[...stats.games]
                    .sort((a, b) => b.horas - a.horas)
                    .map((game) => {
                        const percentage =
                            stats.horas > 0
                                ? Math.round((game.horas / stats.horas) * 100)
                                : 0;

                        return (
                            <div key={game.id} className="month-game" >
                                <img src={game.imagen} alt={game.nombre} />

                                <div className="month-game-content">

                                    <div className="month-game-header">
                                        <h4>{game.nombre}</h4>
                                        <span>{game.horas}h</span>
                                    </div>

                                    <div className="progress-bar Bar-month">
                                        <div className="progress-fill Bar-month" style={{width: `${percentage}%`}} />
                                    </div>

                                    <div className="month-game-footer">
                                        <span>{percentage}% del mes</span>
                                        <span><FaTrophy />{game.logros}</span>
                                    </div>

                                </div>
                            </div>
                        );
                    })}

            </div>

        </>
    );
}

export default MonthModal;