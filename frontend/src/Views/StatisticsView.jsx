import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineAttachMoney, MdOutlineStorage, MdAccessTime } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";
import { loadStats } from "../Controller/StatsController";
import { FaGamepad } from "react-icons/fa";
import { Link } from 'react-router-dom';
import ValuePerHourChart from "../Components/ValuePerHourChart";
import PlayedChart from "../Components/PlayedChart";
import PriceChart from "../Components/PriceChart"
import TopGames from "../Components/TopGames";
import LogrosS  from "../Components/Logros";
import Table  from "../Components/Table";
import Tarjet from "../Components/Tarjet"

const StatisticsView = () => {
    const navigate = useNavigate();
    const [Stats, setStats] = useState({});

    const estadisticas = Stats.stats;
    const promedios = Stats.averages;
    const top = Stats.top_games;
    
    const handleRowClick = (row) => {
        navigate(`/estadisticas/${row.year}`);
    };

    useEffect(() => { loadStats(setStats)},[]);

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
                    Value = {estadisticas?.library?.total ?? 0}
                    Subvalue={`${estadisticas?.wish ?? 0} Deseados`}
                />
                <Tarjet 
                    title = {'Precio Total'}
                    icon = {<MdOutlineAttachMoney />}
                    color = {"Verde"}
                    Value = {`$${(estadisticas?.library?.precio ?? 0).toLocaleString('es-CO')}`}
                    Subvalue = {`Promedio: $${(promedios?.precio ?? 0).toLocaleString('es-CO')}`}
                />
                <Tarjet 
                    title = {'Horas Jugadas'}
                    icon = {<MdAccessTime  />}
                    color = {"Violeta"}
                    Value = {`${estadisticas?.activity?.horas ?? 0}h`}
                    Subvalue = {`${Stats?.stats?.activity.dias ?? 0}`}
                />
                <Tarjet 
                    title = {'Almacenamiento'}
                    icon = {<MdOutlineStorage />}
                    color = {"Naranja"}
                    Value = {`${estadisticas?.library?.almacenamiento ?? 0} GB`}
                    Subvalue = {`Promedio: ${promedios?.Almacenamiento ?? 0} GB`}
                />
            </div>

            <div className="Tarjet_Container_L">
                <div className="Tarjet_L">
                    <PlayedChart games={estadisticas} />
                </div> 
                <div className="Tarjet_L">
                    <h2 className="Tittle_Anio">Actividad por Año</h2>
                    <p className="Subtittle_Anio">Distribucion de tiempo por año</p>
                    
                    <div className="Anio">
                        <Table data={Stats.por_anio} onRowClick={handleRowClick}></Table>
                    </div>
                </div> 
            </div>

            <div className="Tarjet_Container_C">
                <div className="Tarjet_C"> 
                    {top && (
                        <TopGames top_games={top} />
                    )}
                </div>
            </div>
            
            <div className="Tarjet_Container_L">
                <div className="Tarjet_L">
                    <PriceChart 
                        games={Stats.distribucion} 
                        tittle={"Distribucion de Precios"} 
                        subtittle={"Cantidad de juegos por rango de precio "}
                    />
                </div> 
                <div className="Tarjet_L">
                    {Stats.por_Horas && (
                        <ValuePerHourChart 
                            topgames={Stats.por_Horas}
                            tittle={'Precio por Hora'}
                            subtittle={<>El valor promedio de la hora es de{' '}<span className="Valor">${promedios.prom_hora.toLocaleString('es-CO')}</span> </>}
                        />
                    )}
                </div> 
            </div>

            <div className="Tarjet_Container_C">
                <div className="Tarjet_C">
                    {Stats.logros && (
                        <LogrosS data={Stats.logros}/>
                    )} 
                </div>
            </div>
        </>
    );
};

export default StatisticsView;