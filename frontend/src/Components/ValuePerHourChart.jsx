import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "./ValuePerHourChart.css";

const ValuePerHourChart = ({ games }) => {
  const rangos = [
    { rango: "0 - 1K", min: 0, max: 1000 },
    { rango: "1K - 5K", min: 1001, max: 5000 },
    { rango: "> 5K", min: 5001, max: Infinity },
  ];

  const juegosConPrecio = games.filter((g) => parseFloat(g.precio) > 0);

  const valoresHora = juegosConPrecio.map((g) => {
    const precio = parseFloat(g.precio);
    const tiempo = parseFloat(g.tiempo);
    return tiempo > 0 ? precio / tiempo : precio;
  });

  const promedioValorHora = Math.round(valoresHora.reduce((acc, v) => acc + v, 0) / valoresHora.length).toLocaleString("es-CO");
  const totalHoras = juegosConPrecio.reduce((acc, g) => acc + Number(g.tiempo), 0);
  const totalprecio = juegosConPrecio.reduce((acc, g) => acc + Number(g.precio), 0);
  const dt = parseInt( totalprecio /  totalHoras).toLocaleString("es-CO");

  const data = rangos.map(({ rango, min, max }) => ({
    name: rango,
    value: juegosConPrecio.filter((g) => {
      const precio = parseFloat(g.precio);
      const tiempo = parseFloat(g.tiempo);
      const valorHora = tiempo > 0 ? precio / tiempo : precio;
      return valorHora >= min && valorHora <= max;
    }).length,
  }));

  const Colors = ["#6293ff", "#22c55e", "#EF4444"];

  return (
    <div className="Price_Per_Hour_Container">
      <h2 className="chart-title">Valor por Hora</h2>
      <p className="PerHound_subtitle">El valor de la hora es <span className="Valor">${dt}</span> y el Promedio es de <span className="Valor">${promedioValorHora}</span></p>
      <ResponsiveContainer width="115%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%` }
            isAnimationActive={true}
          >
            {data.map((entry, index) => ( <Cell key={`cell-${index}`} fill={Colors[index % Colors.length]} /> ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value} Juegos`, name]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ValuePerHourChart;
