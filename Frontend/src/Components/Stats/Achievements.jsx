import "./Achievements.css";

export default function Achievements({ data }) {

    const pendientes = data.total - data.completados;

    return (
        <div
            className="achievement-panel"
            style={{
                backgroundImage: `
                    linear-gradient(
                        to right,
                        rgba(0,0,0,0.8),
                        rgba(0,0,0,0.5)
                    ),
                    linear-gradient(
                        to top,
                        rgba(0,0,0,0.7),
                        rgba(0,0,0,0)
                    ),
                    url(${data.Top_logro.imagen})
                `
            }}
        >

            <div className="achievement-header">
                <div className="achievement-stats">
                    <div className="statA">
                        <h1>{data.total}</h1>
                        <p>Totales</p>
                    </div>

                    <div className="statA completed">
                        <h1>{data.completados}</h1>
                        <p>Completados</p>
                    </div>

                    <div className="statA progress">
                        <h1>{pendientes}</h1>
                        <p>Pendientes</p>
                    </div>

                </div>

                <div className="top-achievement">

                    <p className="top-label">Juego más completado</p>
                    <h2>{data.Top_logro.nombre}</h2>

                    <p className="top-progress completed">
                        {data.Top_logro.logros_completados}/
                        {data.Top_logro.logros_totales}
                        {" · "}
                        {data.Top_logro.porcentaje}%
                    </p>

                </div>

            </div>

            <div className="dividerAchi" />

            <div className="progress-section">

                <div className="progress-info">
                    <span>Progreso Global</span>
                    <span>{data.porcentaje}%</span>
                </div>

                <div className="progress-bar Bar-arch">
                    <div className="progress-fill Bar-arch" style={{ width: `${data.porcentaje}%` }} />
                </div>

                <p className="progress-text">
                    {data.completados} de {data.total} logros completados
                </p>

            </div>

        </div>
    );
}