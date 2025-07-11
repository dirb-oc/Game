import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from "recharts";
import "./TopPlayedChart.css";

const TopPlayedChart = ({ games }) => {
  const topGames = [...games]
    .sort((a, b) => b.tiempo - a.tiempo)
    .slice(0, 5)
    .map(game => ({
      name: game.nombre.length > 20 ? game.nombre.slice(0, 20) + "…" : game.nombre,
      horas: parseFloat(game.tiempo),
    }));

  return (
    <div className="Top_container">
      <h2 className="Top_title">Top 5 Juegos Más Jugados</h2>
      <p className="top-chart-subtitle">Cantidad total de horas jugadas</p>
      <ResponsiveContainer width="100%" height={370}>
        <BarChart
          data={topGames}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#E5E7EB" interval={0} angle={-15} textAnchor="end" />
          <YAxis stroke="#E5E7EB" />
          <Tooltip />
          <Bar dataKey="horas" fill="#d6803a" radius={[4, 4, 0, 0]}>
            <LabelList dataKey="horas" position="top" fill="#fff" fontSize={12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopPlayedChart;
