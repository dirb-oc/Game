import { GoTrophy } from "react-icons/go";
import { MdOutlineSportsEsports } from "react-icons/md";
import "./YearHighlights.css"

export default function YearHighlights({ data }) {

    const backgroundImage =
        data.terminados.cantidad > 0
            ? data.terminados.top_game.imagen
            : data.logros.cantidad > 0
                ? data.logros.top_game.imagen
                : null;

    return (
        <div
            className="year-highlight-panel"
            style={
                backgroundImage
                    ? {
                        backgroundImage: `
                    linear-gradient(
                        to right,
                        rgba(0,0,0,.85),
                        rgba(0,0,0,.55)
                    ),
                    linear-gradient(
                        to top,
                        rgba(0,0,0,.75),
                        rgba(0,0,0,0)
                    ),
                    url(${backgroundImage})
                `
                    }
                    : {}
            }
        >


            <div className="year-summary">
                <div className="YearHighlights-stats" >

                    <div className="statA completed">
                        <h1>{data.terminados.cantidad}</h1>
                        <p>Juegos Terminados</p>
                    </div>
                    <div className="statA achievement">
                        <h1>{data.logros.cantidad}</h1>
                        <p>Logros Completados</p>
                    </div>

                </div>

                
                <div className="highlight-card" >

                    <div className="highlight-header">
                        <MdOutlineSportsEsports />
                        <span>Top juego terminado</span>
                    </div>

                    <h3>{data.terminados.top_game.nombre}</h3>
                    <p className="highlight-value completed">{data.terminados.top_game.valor} h</p>

                </div>
                
                <div className="highlight-card" >

                    <div className="highlight-header">
                        <GoTrophy />
                        <span>Más logros</span>
                    </div>

                    <h3>{data.logros.top_game.nombre}</h3>

                    <p className="highlight-value achievement">
                        {data.logros.top_game.valor} logros
                    </p>

                </div>


            </div>


        </div>
    );
}