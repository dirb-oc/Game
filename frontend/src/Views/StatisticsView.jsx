import { useEffect, useState } from "react";
import { loadGames } from "../Controller/libraryController";
import { loadWish } from "../Controller/WishController";
import { MdOutlineAttachMoney, MdOutlineStorage, MdAccessTime } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";
import {convertirHorasADiasYHoras} from "../Utils/Utils";
import { FaGamepad } from "react-icons/fa";
import { Link } from 'react-router-dom';
import TopPlayedChart from "../Components/TopPlayedChart";
import PlayedChart from "../Components/PlayedChart";
import Tarjet from "../Components/Tarjet"
import PriceChart from "../Components/PriceChart"

const StatisticsView = () => {
    const [games, setGames] = useState([]);
    const [wish, setwish] = useState([]);
    const totalJuegos = games.length;
    const juegosConPrecio = games.filter(game => Number(game.precio) > 0);
    const totalPrecio = games.reduce((acc, g) => acc + Number(g.precio), 0);
    const totalHoras = games.reduce((acc, g) => acc + Number(g.tiempo), 0);
    const totalAlmacenamiento = games.reduce((acc, g) => acc + Number(g.almacenamiento), 0);
    const promedioPrecio = juegosConPrecio.length > 0 ? totalPrecio / juegosConPrecio.length : 0;
    const promedioAlmacenamiento = totalJuegos > 0 ? totalAlmacenamiento / totalJuegos : 0;

    useEffect(() => {loadGames(setGames); loadWish(setwish)},[]);

    return(
        <>
            <div className="Title">
                <h1><span className="Icon_Title"><IoGameControllerOutline /></span>Estadisticas de Videojuegos</h1>
                <p>
                  Análisis de la <Link to="/" className="List">Colección</Link> de juegos y los <Link to="/deseados" className="Wish">Deseados</Link>.
                </p>
            </div>

            <div className="Tarjet_Container">
                <Tarjet 
                    title = {'Total de Juegos'}
                    icon = {<FaGamepad />}
                    color = {"Azul"}
                    Value = {totalJuegos}
                    Subvalue = {`${wish.length} Deseados`}
                />
                <Tarjet 
                    title = {'Precio Total'}
                    icon = {<MdOutlineAttachMoney />}
                    color = {"Verde"}
                    Value = {`$${totalPrecio.toLocaleString('es-CO')}`}
                    Subvalue = {`Promedio: $${promedioPrecio.toLocaleString('es-CO')}`}
                />
                <Tarjet 
                    title = {'Horas Jugadas'}
                    icon = {<MdAccessTime  />}
                    color = {"Violeta"}
                    Value = {`${totalHoras.toLocaleString('es-CO')}h`}
                    Subvalue = {convertirHorasADiasYHoras(totalHoras)}
                />
                <Tarjet 
                    title = {'Almacenamiento'}
                    icon = {<MdOutlineStorage />}
                    color = {"Naranja"}
                    Value = {`${totalAlmacenamiento.toLocaleString('es-CO')} GB`}
                    Subvalue = {`Promedio: ${promedioAlmacenamiento.toFixed(1)} GB`}
                />
            </div>

            <div className="Tarjet_Container_L">
                <div className="Tarjet_L">
                    <PlayedChart games={games}/>
                </div> 
                <div className="Tarjet_L">
                    <PriceChart games={games} />
                </div> 
            </div>
            <div className="Tarjet_Container_C">
                <div className="Tarjet_C"> 
                    <TopPlayedChart games={games} />
                </div>
            </div>
        </>
    );
};

export default StatisticsView;