import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from "recharts";
import { useState } from "react";
import MonthModal from "../../Components/Stats/MonthModal"
import Modal from "../../Components/Modal"
import "./MonthStats.css";

function CustomTooltip({ active, payload }) {

    if (!active || !payload?.length) return null;

    const item = payload[0];
    const horas = item.value;

    return (
        <div className="custom-tooltip">
            <strong>{item.payload.mes}</strong>
            <p>{horas > 0 ? `${horas} horas` : "Sin registro"}</p>
        </div>
    );
}
function MonthStats({ year, data }) {
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const MONTHS = [
        "Ene", "Feb", "Mar", "Abr",
        "May", "Jun", "Jul", "Ago",
        "Sep", "Oct", "Nov", "Dic"
    ];

    const chartData = data.map(item => ({ ...item, mes: MONTHS[item.month - 1] }));

    const maxHoras = Math.max(...chartData.map(item => item.horas));

    return (
        <div className="month-chart-card">

            <h3 className="chart-title">Distribución por Meses</h3>

            <div className="chart-wrapper">

                <ResponsiveContainer width="100%" height={360} >

                    <BarChart data={chartData}>

                        <CartesianGrid
                            strokeDasharray="4 4"
                            vertical={false}
                            stroke="var(--border)"
                        />

                        <XAxis
                            dataKey="mes"
                            tickLine={true}
                            axisLine={true}
                        />

                        <YAxis
                            width={30}
                            allowDecimals={false}
                            tickLine={true}
                            axisLine={true}
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                        />

                        <Bar
                            dataKey="horas"
                            radius={[8, 8, 0, 0]}
                        >

                            {chartData.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={entry.horas === maxHoras ? "var(--Cash)" : "var(--border)"}
                                    onClick={() => {
                                        setSelectedMonth(entry);
                                        setIsModalOpen(true);
                                    }}
                                    style={{ cursor: "pointer" }}
                                />
                            ))}

                        </Bar>

                    </BarChart>

                </ResponsiveContainer>

            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className={"modal-Month"} >
                {selectedMonth && (
                    <MonthModal year={year} data={selectedMonth} />
                )}
            </Modal>

        </div>
    );
}

export default MonthStats;