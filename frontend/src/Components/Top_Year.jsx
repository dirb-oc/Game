import "./Top_Year.css";

export default function Top_Year({data, tittle, icon}) {

  return (
    <div className="achievement-panel"
      style={{
        backgroundImage: 
        `linear-gradient(to right,rgba(0,0,0,0.9),rgba(0,0,0,0.5)),
        linear-gradient(to top,rgba(0,0,0,0.6),rgba(0,0,0,0)),
        url(${data.top_game.imagen})`
      }}>
      <div className="panel-header">
        <span className="icon">{icon}</span>
        <h3>{tittle}</h3>
      </div>

      <div className="stats">

        <div className="stat lightGreen">
          <h1>{data.cantidad}</h1>
          <p>Completados</p>
        </div>

      </div>

      <div className="dividerYear" />

      <div className="top-year">
        <div className="top-infoYear">
          <div>
            <h4>{data.top_game.nombre}</h4>
          </div>
          <div className="top-textYear">
            <h3 className="lightGreen">{data.top_game.valor}</h3>
            <p>Completados</p>
          </div>
        </div>
      </div>
    </div>
  );
}
