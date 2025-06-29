import "./PlayedChart.css"

const PlayedChart = ({games}) => {
    const Total = games.length;
    const Empezados = (games.filter(game => game.tiempo > 0)).length;
    const Terminados = (games.filter(game => game.terminado)).length;
    const Porcentaje_Empezados = Math.round((100 * Empezados) / Total);
    const Porcentaje_Terminado = Math.round((100 * Terminados) / Total);

    return(
        <div className="Bars_Conteiner">
            <h2 className="Bar_Title">Progreso de la Coleccion</h2>
            <p className="Bar_Tex">Estado de avance de los juegos</p>

            <div className="Bar_Info">
                <p className="Bar_Subtitle">Juegos Comenzados</p>
                <span className="Bar_Tex">{Empezados} de {Total}</span>
            </div>
            <div className="barra">
                <div className="barra-progreso" style={{width: `${Porcentaje_Empezados}%`, background: '#22c55e'}}></div>
            </div>
            <p className="Bar_Subtex">{Porcentaje_Empezados}% de la coleccion</p>
            
            <div className="Bar_Info">
                <p className="Bar_Subtitle">Juegos Terminados</p>
                <span className="Bar_Tex">{Terminados} de {Total}</span>
            </div>
            <div className="barra">
                <div className="barra-progreso" style={{width: `${Porcentaje_Terminado}%`, background: '#6293ff'}}></div>
            </div>
            <p className="Bar_Subtex">{Porcentaje_Terminado}% Completado</p>
            <div className="separator"></div>
            <div className="Numbers">
                <div className="Number">
                    <p className="Ident" style={{color:"#22c55e"}}>{Empezados}</p>
                    <p className="SubIdent">Comenzados</p>
                </div>
                <div className="Number">
                    <p className="Ident" style={{color:"#6293ff"}}>{Terminados}</p>
                    <p className="SubIdent">Terminados</p>
                </div>
            </div>
        </div>
    );
};

export default PlayedChart;