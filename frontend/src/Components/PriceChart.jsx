import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import './PriceChart.css';

const PriceChart = ({ games }) => {
  const data = [
    { range: '100k-80k', count: 0 },
    { range: '80k-60k', count: 0 },
    { range: '60k-40k', count: 0 },
    { range: '40k-20k', count: 0 },
    { range: '20k-0', count: 0 },
  ];

  games.forEach(game => {
    const price = parseFloat(game.precio);
    if (price >= 100000 || price >= 80000) data[0].count++;
    else if (price >= 60000) data[1].count++;
    else if (price >= 40000) data[2].count++;
    else if (price >= 20000) data[3].count++;
    else data[4].count++;
  });

  return (
    <div className="Price_container">
      <h2 className="Price_title">Distribución de Precios</h2>
      <p className="Price_subtitle">Cantidad de juegos por rango de precio</p>
      <ResponsiveContainer height={280} style={{marginLeft: '30px'}}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="range" stroke="#E5E7EB" />
          <YAxis stroke="#E5E7EB" />
          <Tooltip />
          <Bar dataKey="count" fill="#905cf4" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;