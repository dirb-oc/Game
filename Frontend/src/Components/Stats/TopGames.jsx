import { LuCrown } from "react-icons/lu";
import { IoMdTime } from "react-icons/io";
import { GoTrophy } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import "./TopGames.css";

const TopGames = ({ top_games, dis }) => {
    const navigate = useNavigate();

    if (!top_games || top_games.length === 0) return null;

    const [top, ...rest] = top_games;

    return (
        <section className="top-games">
            <div
                className={`top-main ${dis}`}
                style={{ backgroundImage: `url(${top.imagen})` }}
            >
                <div className="overlay">
                    <p className="rank"><span className="Crown"><LuCrown /></span> JUEGO #1</p>
                    <h2 onClick={() => navigate(`/game/${top.id}`)} className="clickable">{top.nombre}</h2>

                    <div className="stats_Top1">
                        <div className="statTop">
                            <IoMdTime className="timer" />
                            <span>{top.horas}h</span>
                        </div>
                        {top.logros > 0 && (
                            <div className="statTop">
                                <GoTrophy className="trophy" />
                                <span>{top.logros} Logros</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="top-list">
                {rest.map((game, index) => (
                    <div
                        key={game.id}
                        className="top-item fade-in"
                        style={{
                            backgroundImage: `
                              linear-gradient(
                                to right,
                                rgba(0,0,0,0.9),
                                rgba(0,0,0,0.5)
                              ),
                              linear-gradient(
                                to top,
                                rgba(0,0,0,0.6),
                                rgba(0,0,0,0)
                              ),
                              url(${game.imagen})
                            `
                        }}
                    >
                        <div className="info">
                            <span className="rank">#{index + 2}</span>
                            <p className="name clickable" onClick={() => navigate(`/game/${game.id}`)} >{game.nombre}</p>
                        </div>
                        <div className="Hours">
                            <span>{game.horas}h</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TopGames;
