import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "./ValuePerHourChart.css";

const ValuePerHourChart = ({ topgames, tittle, subtittle }) => {
    const isMobile = window.innerWidth < 600;

    const RANGE_COLORS = {
        "0-1k": "#22C55E",
        "1k-2.5k": "#abcc16",
        "2.5k-5k": "#FACC15",
        "5k-10k": "#F97316",
        "10k+": "#EF4444",
        "Viejos": "#6293ff",
        "Nuevos": "#22C55E",
    };

    return (
        <div className="Price_Per_Hour_Container">
            <h2 className="chart-title">{tittle}</h2>
            <p className="Pr_subtitle">{subtittle}</p>
            <div className="chart-body">
                <div className="chart-area">
                    <ResponsiveContainer width="100%" height={isMobile ? 220 : 300}>
                        <PieChart>
                            <Pie
                                data={topgames}
                                cx="50%"
                                cy="50%"
                                innerRadius="60%"
                                outerRadius="90%"
                                dataKey="count"
                                nameKey="range"
                                stroke="#111827"
                                strokeWidth={1}
                            >
                                {topgames.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={RANGE_COLORS[entry.range] ?? "#64748B"}
                                    />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value} juegos`]} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="mini-table">
                    {topgames.map((item, index) => (
                        <div key={index} className="mini-row">
                            <span
                                className="dot"
                                style={{ backgroundColor: RANGE_COLORS[item.range] }}
                            />
                            <span className="range">{item.range}</span>
                            <span className="count">{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default ValuePerHourChart;