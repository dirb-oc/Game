import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import "./CollectionDistribution.css";

function CustomTooltip({ active, payload, totalGames, completed }) {
    if (!active || !payload?.length) return null;

    const data = payload[0].payload;

    let value = data.value;

    if (data.name === "Jugados") {
        value += completed;
    }

    const percentage = ((value / totalGames) * 100).toFixed(1);

    return (
        <div className="custom-tooltip">
            <strong>{data.name}</strong>
            <p>{value} juegos</p>
            <p>{percentage}%</p>
        </div>
    );
}

function CollectionDistribution({ totalGames, started, completed }) {
    const playing = Math.max(started - completed, 0);
    const notStarted = Math.max(totalGames - started, 0);

    const data = [
        {
            name: "Jugados",
            value: playing
        },
        {
            name: "Terminados",
            value: completed
        },
        {
            name: "Sin jugar",
            value: notStarted
        }
    ];

    const COLORS = ["var(--Azul)", "var(--Complete)", "#4b5563"];

    return (
        <div className="distribution-card">

            <h3 className="distribution-title">Estado de la Biblioteca</h3>
            <div className="distribution-chart">

                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            innerRadius={65}
                            outerRadius={95}
                            stroke="none"
                        >
                            {data.map((_, index) => (<Cell key={index} fill={COLORS[index]} />))}
                        </Pie>

                        <Tooltip content={<CustomTooltip totalGames={totalGames} completed={completed} />} />

                    </PieChart>
                </ResponsiveContainer>

            </div>

            <div className="distribution-stats">

                <div className="stat-item">
                    <span className="Collec-value started">{started}</span>
                    <span className="stat-label">Jugados</span>
                </div>

                <div className="stat-item">
                    <span className="Collec-value completed">{completed}</span>
                    <span className="stat-label">Terminados</span>
                </div>
            </div>
        </div>
    );
}

export default CollectionDistribution;