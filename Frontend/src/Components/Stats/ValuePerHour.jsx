import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import "./ValuePerHour.css";

function CustomTooltip({ active, payload }) {

    if (!active || !payload?.length) return null;

    const item = payload[0];

    return (
        <div className="custom-tooltip">
            <strong>${item.payload.range}/h</strong>
            <p>{item.value} juegos</p>
        </div>
    );
}

function ValuePerHour({ data, average }) {

    const COLORS = ["#00d6a8", "var(--Cash)", "#3ec650", "#f59e0b", "#ef4444"];

    return (
        <div className="chart-card">

            <h3 className="chart-title">Valor por Hora</h3>

            <div className="chart-wrapper">

                <ResponsiveContainer width="100%" height={250} >

                    <BarChart data={data}>

                        <XAxis
                            dataKey="range"
                            tickLine={true}
                            axisLine={true}
                        />

                        <YAxis
                            width={25}
                            allowDecimals={false}
                            tickLine={true}
                            axisLine={true}
                        />

                        <Tooltip content={<CustomTooltip />} />

                        <Bar dataKey="count" radius={[8, 8, 0, 0]} >
                            {data.map((_, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}
                        </Bar>

                    </BarChart>

                </ResponsiveContainer>

            </div>

            <div className="chart-average">
                <h2 className="cash">{`$${average}/h`}</h2>
                <p>Promedio por Hora</p>
            </div>
        </div>
    );
}

export default ValuePerHour;