import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import './PriceChart.css';

const PriceChart = ({ games, tittle, subtittle }) => {

    if (!Array.isArray(games) || games.length === 0) return null;

    const isGamesDistribution =
        games.length === 2 &&
        games.some(g => g.range === 'Nuevos' || g.range === 'Viejos');

    return (
        <div className="Price_container">
            <h2 className="Price_title">{tittle}</h2>
            <p className="Price_subtitle">{subtittle}</p>

            <ResponsiveContainer height={280} style={{ marginLeft: '-20px' }}>
                <BarChart data={games}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="range" stroke="#E5E7EB" />
                    <YAxis stroke="#E5E7EB" />
                    <Tooltip />

                    <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                        {games.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={
                                    isGamesDistribution
                                        ? entry.range === 'Nuevos'
                                            ? '#22c55e'
                                            : '#6293ff'
                                        : '#905cf4'
                                }
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PriceChart;