import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGameById } from "../Controller/libraryController";
import { MdOutlineStorage, MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaChevronLeft, FaCalendarAlt, FaTags } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi2";
import { GoTrophy } from "react-icons/go";
import UpdateLibrary from "./UpdateLibrary";
import HoursModal from "../Components/HoursModal";
import ArchiModal from "../Components/ArchiModal";
import DateModal from "../Components/DateModal";
import "../Components/Read.css";

const ReadLibrary = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [Archi, setArchi] = useState(0);
    const [hours, setHours] = useState(0);
    const fetchGame = async () => {
        try {
            const data = await getGameById(id);
            setGame(data);
        } catch {
            alert("Error al cargar juego");
        }
    };

    useEffect(() => { fetchGame(); }, [id]);
    useEffect(() => {
        if (!game) return;
        setHours(game.total_horas);
        setArchi(game.logros_completados);
        setInitialHours(game.total_horas);
    }, [game]);

    const [openHours, setOpenHours] = useState(false);
    const [openArchi, setOpenArchi] = useState(false);
    const [initialHours, setInitialHours] = useState(0);
    const [openFinish, setOpenFinish] = useState(false);

    if (!game) { return <></>; };

    const Estado = game.fecha_terminado ? "Terminado" : game.total_horas > 0 ? "Jugando" : "Sin_Jugar";
    const Precio = game.precio == 0 ? "Gratis" : `$${Number(game.precio).toLocaleString("es-CO")}`;
    const v_hora = game.valor_hora == null ? Precio : `$${Number(game.valor_hora).toLocaleString("es-CO")}`;

    let logr = (<>{game.logros_completados}<span className="Amarillo"> / </span>{game.logros_Cantidad}</>);
    let logrN = (<>—<span className="Amarillo"> / </span>—</>);

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
                        <p className={`Status ${Estado}`} onClick={Estado === "Jugando" ? () => setOpenFinish(true) : undefined}>{Estado.replace("_", " ")}</p>
                    </div>
                </div>
            </div>

            <div className="ContainerT_LM">
                <div className="Tarjet_LM">
                    <div className="card_Info">
                        <h2 className="card-title">Información</h2>
                        <p className="card-description">{game.descripcion}</p>

                        <div className="separator" />
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="icon"><FaCalendarAlt /></span>
                                <div>
                                    <p className="label">Año de lanzamiento</p>
                                    <p className="value">{new Date(game.lanzamiento).getFullYear()}</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <span className="icon"><FaTags /></span>
                                <div>
                                    <p className="label">Género</p>
                                    <p className="value">
                                        {game.J_genero.map(g => g.genero).join(", ")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="Tarjet_S">
                    <div className="Card_Stats">
                        <div className="card-header">
                            <h2>Estadísticas</h2>
                            <UpdateLibrary game={game} />
                        </div>
                        <StatBlock icon={<MdOutlineAccessTimeFilled />} color={"#7c3aed"} title="Horas Jugadas" value={`${game.total_horas} h`} onClick={() => setOpenHours(true)} />
                        <StatBlock icon={<HiCurrencyDollar />} color={"#16a34a"} title="Precio" value={`${Precio}`} />
                        <StatBlock icon={<MdOutlineStorage />} color={"#ca8a04"} title="Almacenamiento" value={`${game.almacenamiento} GB`} />
                        <StatBlock
                            icon={<GoTrophy />}
                            color={game.logros_Cantidad ? "#ffd700" : "#6b7280"}
                            title="Logros" value={game.logros_Cantidad ? logr : logrN}
                            onClick={game.logros_Cantidad > 0 ? () => setOpenArchi(true) : undefined}
                        />

                        {game.logros_Cantidad > 0 ? (
                            <>
                                <div className="progress">
                                    <div className="progress-bar" style={{ width: `${game.porcentaje_logros}%` }} />
                                </div>
                                <p className="stat-footer">{`${game.porcentaje_logros.toFixed(0)}% Completado`}</p>
                            </>
                        ) : (<br />)}

                        <div className="extra-stats">
                            <div>
                                <p className="label">Valor por hora</p>
                                <p className="highlight">{v_hora}</p>
                            </div>

                            <div>
                                <p className="label">Tiempo</p>
                                <p className="secondary">{game.horas_en_dias}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <HoursModal open={openHours} onClose={() => setOpenHours(false)} hours={hours} setHours={setHours} gameId={game.id} onSaved={fetchGame} Thours={initialHours} />
            <ArchiModal open={openArchi} onClose={() => setOpenArchi(false)} Archi={Archi} setArchi={setArchi} gameId={game.id} onSaved={fetchGame} total={game.logros_Cantidad} />
            <DateModal open={openFinish} onClose={() => setOpenFinish(false)} gameId={game.id} onSaved={fetchGame} />
        </>
    );
};

export default ReadLibrary;

function StatBlock({ icon, color, title, value, onClick }) {
    return (
        <div className={`stat-block`}>
            <div className="stat-left">
                <span className="stat-icon" style={{ color }}>
                    {icon}
                </span>
                <span className="stat-title">{title}</span>
            </div>

            <span className={`stat-value ${onClick ? "clickable" : ""}`} onClick={onClick}>{value}</span>
        </div>
    );
}