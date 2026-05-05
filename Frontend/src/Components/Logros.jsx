import { GoTrophy } from "react-icons/go";
import "./Logros.css";

export default function LogrosS({ data }) {

    return (
        <div className="achievement-panel"
            style={{
                backgroundImage: `
                  linear-gradient(
                    to right,
                    rgba(0,0,0,0.9),
                    rgba(0,0,0,0.5)
                  ),
                  linear-gradient(
                    to top,
                    rgba(0,0,0,0.6),
                    rgba(0,0,0,0)
                  ),
                  url(${data.Top_logro.imagen})
                `
            }}
        >
            <div className="panel-header">
                <span className="icon"><GoTrophy /></span>
                <p className="tittle">Logros</p>
            </div>

            <div className="statsArch">
                <div className="statA">
                    <h1>{data.total}</h1>
                    <p>Total de logros</p>
                </div>

                <div className="statA lightGreen">
                    <h1>{data.completados}</h1>
                    <p>Completados</p>
                </div>

                <div className="statA warning">
                    <h1>{data.porcentaje}%</h1>
                    <p>Progreso</p>
                </div>
            </div>

            <div className="divider" />

            <div className="top-achievement">
                <div className="top-info">
                    <div>
                        <h4>{data.Top_logro.nombre}</h4>
                        <p>{data.Top_logro.logros_completados}/{data.Top_logro.logros_totales} Logros</p>
                    </div>
                    <div>
                        <h3 className="lightGreen">{data.Top_logro.porcentaje}%</h3>
                        <p>Completado</p>
                    </div>
                </div>
            </div>

            <div className="log-progress">
                <div className="progress_Indi">
                    <p>Barra de progreso global</p>
                    <p>{data.completados} / {data.total}</p>
                </div>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${data.porcentaje}%` }} />
                </div>
            </div>
        </div>
    );
}
