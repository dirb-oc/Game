import { MdOutlineStorage, MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaCalendarAlt, FaTags } from "react-icons/fa";
import { formatPrice } from "../Services/formatters";
import { HiCurrencyDollar } from "react-icons/hi2";
import { GoTrophy } from "react-icons/go";
import { useState } from "react";

import FormAchievements from "./Forms/FormAchievements";
import FormEditGame from "./Forms/FormEditGame";
import FormHours from "./Forms/FormHours";
import Modal from "./Modal";
import "./GameStats.css";

const GameStats = ({ game, refreshGame }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openHours, setOpenHours] = useState(false);
    const [OpenAchievements, setOpenAchievements] = useState(false);

    const v_hora = game.valor_hora == null ? formatPrice(game.precio) : formatPrice(game.valor_hora);

    let logr = (<>{game.logros_completados}<span className="achievement"> / </span>{game.logros_Cantidad}</>);
    let logrN = (<>— / —</>);

    return (
        <>
            <div className="GameStats-Container Base">
                <div className="gameInformation">
                    <div className="card_Info">
                        <div className="card-content">
                            <div className="gamecard-header">
                                <h2 className="card-title">Información</h2>
                            </div>
                            <p className="card-description">{game.descripcion}</p>
                        </div>

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
                                    <p className="value">{game.J_genero.map(g => g.genero).join(", ")}</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>


                <div className="gameStats">

                    <div className="Card_Stats">

                        <div className="gamecard-header">
                            <h2 className="card-title">Estadísticas</h2>
                            <button className="Edit" onClick={() => setOpenEdit(true)}>Editar</button>
                        </div>

                        <div className="game-stats">

                            <div className="stats-card">
                                <div className="tittle-stat">
                                    <MdOutlineAccessTimeFilled className="hours" />
                                    <span className="stat-label">Horas jugadas</span>
                                </div>
                                <span
                                    className="stat-number clickable"
                                    onClick={() => setOpenHours(true)}
                                >
                                    {game.total_horas}h
                                </span>
                            </div>

                            <div className="stats-card">
                                <div className="tittle-stat">
                                    <HiCurrencyDollar className="cash" />
                                    <span className="stat-label">Precio</span>
                                </div>
                                <span className="stat-number">{formatPrice(game.precio)}</span>
                            </div>

                            <div className="stats-card">
                                <div className="tittle-stat">
                                    <MdOutlineStorage className="storage" />
                                    <span className="stat-label">Almacenamiento</span>
                                </div>
                                <span className="stat-number">{game.almacenamiento} GB</span>
                            </div>

                            <div className="stats-card">
                                <div className="tittle-stat">
                                    <GoTrophy className="achievement" />
                                    <span className="stat-label">Logros</span>
                                </div>
                                <span
                                    className={`stat-number ${game.logros_Cantidad > 0 ? "clickable" : ""}`}
                                    onClick={game.logros_Cantidad > 0 ? () => setOpenAchievements(true) : undefined}
                                >
                                    {game.logros_Cantidad ? logr : logrN}
                                </span>
                            </div>

                        </div>

                        {game.logros_Cantidad > 0 && (
                            <div className="achievement-section">

                                <div className="achievementGame-header">
                                    <span>Progreso de logros</span>
                                    <span>{game.porcentaje_logros.toFixed(0)}%</span>
                                </div>

                                <div className="achievement-bar">
                                    <div
                                        className="achievement-fil"
                                        style={{ width: `${game.porcentaje_logros}%` }}
                                    />
                                </div>

                            </div>
                        )}

                        <div className="extra-stats">

                            <div>
                                <span>Valor por hora</span>
                                <strong>{v_hora}</strong>
                            </div>

                            <div>
                                <span>Tiempo total</span>
                                <strong>{game.horas_en_dias}</strong>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <Modal isOpen={openHours} onClose={() => setOpenHours(false)} className={"modal-FormAdd"}>
                <FormHours
                    currentHours={game.total_horas}
                    game={game.id}
                    Thours={game.total_horas}
                    onClose={() => setOpenHours(false)}
                    onSuccess={() => {
                        refreshGame();
                        setOpenHours(false);
                    }}
                />
            </Modal>
            <Modal isOpen={openEdit} onClose={() => setOpenEdit(false)} className={"modal-FormGame"} >
                <FormEditGame
                    game={game}
                    onClose={() => setOpenEdit(false)}
                    onSuccess={() => {
                        refreshGame();
                        setOpenEdit(false);
                    }}
                />
            </Modal>
            {game.logros_Cantidad > 0 && (
                <Modal
                    isOpen={OpenAchievements}
                    onClose={() => setOpenAchievements(false)}
                    className={"modal-FormAdd"}
                >
                    <FormAchievements
                        completeArchi={game.logros_completados}
                        game={game.id}
                        totalArchi={game.logros_Cantidad}
                        onClose={() => setOpenAchievements(false)}
                        onSuccess={() => {
                            refreshGame();
                            setOpenAchievements(false);
                        }}
                    />
                </Modal>
            )}

        </>
    );
};

export default GameStats;