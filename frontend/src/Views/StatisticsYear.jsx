import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineAttachMoney, MdOutlineStorage, MdAccessTime } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";
import { GoTrophy } from "react-icons/go";
import { loadStatsYear } from "../Controller/StatsController";
import { FaGamepad, FaCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { loadStatsMonth } from "../Controller/StatsController";

import ValuePerHourChart from "../Components/ValuePerHourChart";
import PriceChart from "../Components/PriceChart"
import TopGames from "../Components/TopGames";
import Top_Year  from "../Components/Top_Year";
import MonthCard  from "../Components/MonthCard";
import Tarjet from "../Components/Tarjet"

const StatisticsView = () => {
    const { year } = useParams();
    const [Stats, setStats] = useState({});
    const estadisticas = Stats?.totals ?? [];
    const meses = Stats?.meses ?? [];
    const mesesConHoras = meses.filter(m => m.horas > 0);
    const [mesSeleccionado, setMesSeleccionado] = useState(null);
    const [monthData, setMonthData] = useState(null);

    useEffect(() => {
      if (!year) return;
      loadStatsYear(year, setStats);
    }, [year]);

    useEffect(() => {
        if (!mesesConHoras.length || mesSeleccionado) return;
        const mesTop = mesesConHoras.reduce(
            (max, actual) => (actual.horas > max.horas ? actual : max),
            mesesConHoras[0]
        );
        setMesSeleccionado(mesTop);
    }, [mesesConHoras, mesSeleccionado]);

    useEffect(() => {
      if (!mesSeleccionado) return;    
      loadStatsMonth(year, mesSeleccionado.month, setMonthData);
    }, [mesSeleccionado, year]);
    
    const juegosDistribution = [
        { range: 'Nuevos', count: Stats?.distribucion?.juegos?.nuevos ?? 0 },
        { range: 'Viejos', count: Stats?.distribucion?.juegos?.viejos ?? 0 }
    ];
    
    const HorasDistribution = [
        { range: 'Nuevos', count: Stats?.distribucion?.horas?.nuevos ?? 0 },
        { range: 'Viejos', count: Stats?.distribucion?.horas?.viejos ?? 0 }
    ];

    return(
        <>
            <div className="Title">
                <h1><span className="Icon_Title"><IoGameControllerOutline /></span>Estadisticas del Año</h1>
                <p>
                  Las <Link to="/estadisticas" className="Wish">Estadisticas</Link> del año {year}
                </p>
            </div>

            <div className="Tarjet_Container">
                <Tarjet 
                    title = {'Total de Jugados'}
                    icon = {<FaGamepad />}
                    color = {"Azul"}
                    Value = {estadisticas?.jugados ?? 0}
                    Subvalue={`${estadisticas?.juegos ?? 0} Deseados`}
                />
                <Tarjet 
                    title = {'Precio Total'}
                    icon = {<MdOutlineAttachMoney />}
                    color = {"Verde"}
                    Value = {`$${(estadisticas?.precio ?? 0).toLocaleString('es-CO')}`}
                    Subvalue = {`Promedio: $${(estadisticas?.pro_precio ?? 0).toLocaleString('es-CO')}`}
                />
                <Tarjet 
                    title = {'Horas Jugadas'}
                    icon = {<MdAccessTime  />}
                    color = {"Violeta"}
                    Value = {`${estadisticas?.horas ?? 0}h`}
                    Subvalue = {`${estadisticas?.tiempo ?? 0}`}
                />
                <Tarjet 
                    title = {'Almacenamiento'}
                    icon = {<MdOutlineStorage />}
                    color = {"Naranja"}
                    Value = {`${estadisticas?.almacenamiento ?? 0} GB`}
                    Subvalue = {`Promedio: ${(estadisticas?.pro_alm)?.toFixed(1) ?? 0} GB`}
                />
            </div>

            <div className="Tarjet_Container_L">
                <div className="Tarjet_L">
                    <PriceChart 
                        games={juegosDistribution}
                        tittle={"Distribucion de Juegos"} 
                        subtittle={"Cantidad de juegos por antiguedad "}
                    />
                </div> 
                <div className="Tarjet_L">
                    <ValuePerHourChart 
                        topgames={HorasDistribution}
                        tittle={'Distribucion de Horas'}
                        subtittle={"Distribucion de horas por antiguedad del Juego"}
                    />
                </div> 
            </div>

            <div className="Tarjet_Container_C">
                <div className="Tarjet_C"> 
                    <TopGames top_games={Stats.top_games} />
                </div>
            </div>
            
            <div className="Tarjet_Container_L">
                <div className="Tarjet_L">
                    {Stats.highlights && (
                        <Top_Year 
                            data={Stats.highlights.logros}
                            tittle={'Logros'}
                            icon={<GoTrophy />}
                            />
                        )} 
                </div> 
                <div className="Tarjet_L">
                    {Stats.highlights && (
                        <Top_Year
                            data={Stats.highlights.terminados}
                            tittle={'Juegos Terminados'}
                            icon={<FaCheckCircle />}
                        />  
                    )} 
                </div> 
            </div>

            <div className="Tarjet_Container_C">
                {!monthData && (
                    <div className="MonthCard">
                        Cargando estadísticas del mes...
                    </div>
                )} {monthData && (
                    <MonthCard
                        data={monthData}                        
                        meses={mesesConHoras}
                        mes={mesSeleccionado}
                        onChangeMes={setMesSeleccionado}
                    />
                )}
            </div>
        </>
    );
};

export default StatisticsView;