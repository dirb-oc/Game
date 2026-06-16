import { FaClock, FaHdd, FaCheckCircle } from "react-icons/fa";
import { formatPrice } from "../Services/formatters";
import { useNavigate } from "react-router-dom";
import "./Card.css";

function Card({ game }) {
    const navigate = useNavigate();
    const isCompleted = !!game.fecha_terminado;
    const releaseYear = game.lanzamiento ? new Date(game.lanzamiento).getFullYear() : "----";

    return (
        <div className="game-card" onClick={() => navigate(`/game/${game.id}`)}>
            <div className="game-card-image" style={{ backgroundImage: `url(${game.imagenP})` }}>
                <div className="game-card-gradient" />
            </div>

            <div className="game-card-content">

                <div className="card-header">
                    <h3>{game.nombre}</h3>
                    <span className="price">{formatPrice(game.precio)}</span>
                </div>

                <div className="card-status">
                    <span className="year">{releaseYear}</span>

                    {isCompleted ? (
                        <span className="completedCard"><FaCheckCircle /> Completado</span>
                    ) : game.total_horas > 0 ? (
                        <span className="playing">En progreso</span>
                    ) : (
                        <span className="pending">Sin Jugar</span>
                    )}
                </div>

                <div className="genres">
                    {game.J_genero?.slice(0, 3).map((genre) => (
                        <span key={genre.id} className="genre-pill">{genre.genero}</span>
                    ))}
                </div>

                <div className="divider" />

                <div className="card-footer">
                    <div className="footer-item hours"><FaClock />{game.total_horas}h</div>
                    <div className="footer-item storage"><FaHdd />{game.almacenamiento} GB</div>
                </div>
            </div>
        </div>
    );
}

export default Card;