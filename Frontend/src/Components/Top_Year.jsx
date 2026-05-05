import { GoTrophy } from "react-icons/go";
import { FaCheckCircle } from "react-icons/fa";
import "./Top_Year.css";

export default function Top_Year({ data, tipo }) {

    const config = {
        logros: {
            title: "Logros",
            icon: <GoTrophy />,
            label: "Logros",
            sublabel: "Completados",
        },
        terminados: {
            title: "Juegos Terminados",
            icon: <FaCheckCircle />,
            label: "Terminados",
            sublabel: "Horas",
        },
    };

    const current = config[tipo];

    return (
        <div
            className="panel-topyear"
            style={{
                backgroundImage: `
                    linear-gradient(to right,rgba(0,0,0,0.9),rgba(0,0,0,0.5)),
                    linear-gradient(to top,rgba(0,0,0,0.6),rgba(0,0,0,0)),
                    url(${data.top_game.imagen})
                `
            }}
        >
            <div className="topyear-header">
                <span className="icon">{current.icon}</span>
                <h3>{current.title}</h3>
            </div>

            <div className="stats">
                <div className="stat lightGreen">
                    <h1>{data.cantidad}</h1>
                    <p>{current.label}</p>
                </div>
            </div>

            <div className="dividerYear" />

            <div className="top-year">
                <div className="top-infoYear">
                    <div>
                        <h4>{data.top_game.nombre}</h4>
                    </div>
                    <div className="top-textYear">
                        <p className="lightGreen">{data.top_game.valor}</p>
                        <p>{current.sublabel}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
