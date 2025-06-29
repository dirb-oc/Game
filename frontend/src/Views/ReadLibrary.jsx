import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGameById } from "../Controller/libraryController";
import { loadGames } from "../Controller/libraryController";
import { FaChevronLeft, FaTrophy  } from "react-icons/fa";
import { MdOutlineAttachMoney, MdOutlineStorage, MdAccessTime } from "react-icons/md";
import {convertirHorasADiasYHoras} from "../Utils/Utils";
import UpdateLibrary from "./UpdateLibrary";
import Tarjet from "../Components/Tarjet"
import "../Components/Read.css";

const ReadLibrary = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getGameById(id).then(setGame).catch(() => alert("Error al cargar juego"));
    loadGames(setGames);
  }, [id]);

  if (!game) return <p className="Loading"></p>;

  const Estado = game.terminado ? "Terminado" : game.tiempo > 0 ? "Empezado" : "Sin_Jugar";
  const Descripcion = game.terminado ? "Terminado" : game.tiempo > 0 ? "Jugando" : "Sin Jugar";
  const Dias = convertirHorasADiasYHoras(game.tiempo);
  const Precio = game.precio == 0 ? "Gratis" : `$${Number(game.precio).toLocaleString("es-CO")}`;
  const Tiempo = game.tiempo > 0 ? `${parseFloat(game.tiempo)} ${game.tiempo == 1 ? "Hora" : "Horas"}`: "Sin Registro";
  const totalPrecio = games.reduce((acc, g) => acc + Number(g.precio), 0);
  const totalHoras = games.reduce((acc, g) => acc + Number(g.tiempo), 0);
  const totalAlmacenamiento = games.reduce((acc, g) => acc + Number(g.almacenamiento), 0);
  
  const porcentajeHoras =  game.tiempo > 0
    ? ((game.tiempo / totalHoras) * 100).toFixed(1) : "0";

  const porcentajePrecio = game.precio > 0
    ? ((game.precio / totalPrecio) * 100).toFixed(1) : "0";

  const porcentajeAlma = game.almacenamiento > 0
    ? ((game.almacenamiento / totalAlmacenamiento) * 100).toFixed(1) : "0";



  const valorPorHora = () => {
    if (game.precio == 0) return "$0";
    if (game.tiempo == 0) return "No jugado";
    const valor = game.precio / game.tiempo;
        return `$${Number(valor).toLocaleString("es-CO")}`
    };

    let Subvalue;
    let Value;
    const cantidad = Number(game.logros_Cantidad);
    const completados = Number(game.logros_Completados);

    if (!cantidad || isNaN(cantidad) || cantidad === 0) {
      Value = "Sin Logros";
      Subvalue = "No Aplica";
    } else {
      const porcentaje = Math.round((completados / cantidad) * 100) || 0;
      Value = `${completados}/${cantidad}`;
      Subvalue = `${porcentaje}% Completados`;
    };

  return (
    <>
      <div className="Banner">
        <div className="banner-background" style={{ backgroundImage: `url(${game.imagen})` }}>
          <div className="banner-overlay" />
        </div>

          <div className="banner-content">
            <img src={game.imagenP} alt="Portada" className="banner-cover" />
            <div className="banner-text">
                <button className="Back" onClick={() => navigate(-1)}><span className="Back_Icon"><FaChevronLeft /></span> Volver</button>
                <h1 className="Read_Title">{game.nombre}</h1>
                <p className="Read_Year">• {new Date(game.lanzamiento).getFullYear()}</p>
                <p className={`Status ${Estado}`}>{Descripcion}</p>
                <div className="Genres_Container">
                    {game.J_genero.map((g, i) => (
                        <span key={i} className="Genres">
                            {g.genero}
                        </span>
                    ))}
                </div>
            </div>
          </div>
        </div>

        <div className="Tarjet_Container Mas">
          <Tarjet 
            title = {'Precio Total'}
            icon = {<MdOutlineAttachMoney />}
            color = {"Verde"}
            Value = {Precio}
            Subvalue = {`Por hora: ${valorPorHora()}`}
          />
          <Tarjet 
            title = {'Tiempo Jugado'}
            icon = {<MdAccessTime />}
            color = {"Azul"}
            Value = {Tiempo}
            Subvalue = {Dias}
          />
          <Tarjet 
            title = {'Almacenamiento'}
            icon = {<MdOutlineStorage />}
            color = {"Naranja"}
            Value = {`${parseFloat(game.almacenamiento)} GB`}
            Subvalue = {`Instalado`}
          />
          <Tarjet 
            title = {'Logros'}
            icon = {<FaTrophy />}
            color = {"Amarillo"}
            Value = {<>{completados}<span className="Amarillo">/</span>{cantidad}</>}
            Subvalue = {Subvalue}
          />
        </div>
          
        <div className="ContainerT_LM">
          <div className="Tarjet_LM">
            <h2 className="Title_Card">Descripcion</h2>
            <p className="ReadDescription">{game.descripcion}</p>
          </div>
          <div className="Tarjet_S">
            <h2 className="Title_Card">Porcentaje en la Coleccion</h2>
            <div className="Porcent_Game">
              <div className="GamePorcent">
                <p className="Porcent" style={{color: "#22c55e"}}>{porcentajePrecio}%</p>
                <p className="GameItem">Precio</p>
              </div>
              <div className="GamePorcent">
                <p className="Porcent" style={{color: "#6293ff"}}>{porcentajeHoras}%</p>
                <p className="GameItem">Tiempo</p>
              </div>
              <div className="GamePorcent">
                <p className="Porcent" style={{color: "#d6803a"}}>{porcentajeAlma}%</p>
                <p className="GameItem">Storage</p>
              </div>
            </div>
            <div className="separator"></div>
            <UpdateLibrary game={game} />
          </div>
        </div>
    </>
  );
};

export default ReadLibrary;

//  