import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./JuegosPorAnioChart.css";

const JuegosPorAnioChart = ({ games }) => {
  const years = games.map(g => new Date(g.lanzamiento).getFullYear()).filter(y => !isNaN(y));
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  const juegosPorAño = {};
  
  for (let y = minYear; y <= maxYear; y++) { juegosPorAño[y] = 0; }

  years.forEach(y => { juegosPorAño[y]++; });

  const dataAño = Object.entries(juegosPorAño).map(([year, Cantidad]) => ({ year: parseInt(year), Cantidad}));

  const ticksCadaDosAnios = []; 
  for (let y = minYear; y <= maxYear; y += 2) { ticksCadaDosAnios.push(y); }

  return (
    <div className="chart-container">
      <h1 className="chart-title">Distribución de Juegos por Año</h1>
      <p className="chart-subtitle">Cantidad de juegos agregados por año</p>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={dataAño}>
          <CartesianGrid strokeDasharray="3 3" stroke="#252f3fff" />
          <XAxis dataKey="year" stroke="#E5E7EB" ticks={ticksCadaDosAnios}/>
          <YAxis allowDecimals={false} stroke="#E5E7EB" />
          <Tooltip 
            contentStyle={{
              backgroundColor: "#0f172a", // fondo más oscuro y elegante
              border: "1px solid #7c3aed", // morado más vibrante (de tu paleta)
              borderRadius: "8px",
              color: "#f1f5f9", // texto más claro
              fontWeight: "bold"
            }}
          />
          <Area
            type="monotone"
            dataKey="Cantidad"
            stroke="#7c3aed"
            fill="#7c3aed"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default JuegosPorAnioChart;
