import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import "./PriceDistribution.css";

function CustomTooltip({ active, payload }) {

    if (!active || !payload?.length) return null;

    const item = payload[0];

    return (
        <div className="custom-tooltip">
            <strong>${item.payload.range}</strong>
            <p>{item.value} juegos</p>
        </div>
    );
}

function PriceDistribution({ data, average }) {
 
    return (
        <div className="chart-card">
            <h3 className="chart-title">Distribución de Precios</h3>
            <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={250} >

                    <BarChart data={data} layout="vertical" >
                        
                        <XAxis type="number" />
                        <YAxis dataKey="range" type="category" tickLine={true} axisLine={true} />
                        <Bar dataKey="count" fill="var(--Azul)" radius={[0,5,5,0]} />
                        <Tooltip content={<CustomTooltip />} />

                    </BarChart>
                </ResponsiveContainer>

            </div>

            <div className="chart-average">
                <h2 className="cash">${average.toLocaleString("es-CO")}</h2>
                <p>Precio Promedio</p>
            </div>

        </div>
    );
}

export default PriceDistribution;