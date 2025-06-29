import { FaRegClock } from "react-icons/fa";
import "./Card.css";

const Card = ({ image, title, genres, year, time, finished, price, storage }) => {
  const Tiempo = time > 0 ? `${parseFloat(time)} ${time == 1 ? "Hora" : "Horas"}`: "----";
  const Precio = price == 0 ? "Gratis" : `$${Number(price).toLocaleString("es-CO")}`;
  const Estado = finished ? "Terminado": time > 0 ? "Empezado" : "Sin_Jugar";
  const Descripcion = finished ? "Terminado" : time > 0 ? "Jugando" : "Sin Jugar";
  const lanzamiento = new Date(year).getFullYear();

  return (
    <div className="Card">
      <img className="Card_Image" src={image} alt={title} />
      <div className="Card_Info">
        <div className="Card_Head">
          <h3 className="Card_Title">{title}</h3>
          <p className="Year_Realese">{lanzamiento}</p>
        </div>
        {genres.map((g, i) => (
          <span key={i} className="Genres">
            {g.genero}{i < genres.length - 1}
          </span>
        ))}
        <div className="Flexo">
          <p className="Time">
            <span className="Icon"><FaRegClock /></span>{Tiempo}
          </p>
          <p className={`Status ${Estado}`}>{Descripcion}</p>
        </div>
        <div className="Card_Data">
          <p>{Precio}</p>
          <p>{parseFloat(storage)} GB</p>
        </div>
      </div>
    </div>
  );
};

export default Card;