import { FaChevronLeft, FaCheckCircle, FaClock, FaMinusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FormCompleteDate from "../Components/Forms/FormCompleteDate"
import Modal from "../Components/Modal"
import "./BannerGame.css";

function BannerGame({ game, refreshGame }) {
    const [Open, setOpen] = useState(false);
    const navigate = useNavigate();

    const statusInfo = game.fecha_terminado
        ? {
            text: "Completado",
            className: "completed",
            icon: <FaCheckCircle />
        }
        : game.total_horas > 0
            ? {
                text: "En Progreso",
                className: "progre clickable",
                icon: <FaClock />
            }
            : {
                text: "Sin Jugar",
                className: "pending",
                icon: <FaMinusCircle />
            };

    return (
        <div className="Banner">

            <div className="banner-background" style={{ backgroundImage: `url(${game.imagen})` }}>
                <div className="banner-overlay" />
            </div>

            <div className="banner-content">

                <img src={game.imagenP} alt="Portada" className="banner-cover" />

                <div className="banner-text">

                    <button className="Back" onClick={() => navigate(-1)} >
                        <span className="Back_Icon"><FaChevronLeft /></span>Volver
                    </button>

                    <h1 className="Read_Title">{game.nombre}</h1>
                    <div 
                        className={`Status ${statusInfo.className}`} 
                        onClick={statusInfo.text == "En Progreso" ? () => setOpen(true) : undefined}
                    >
                        {statusInfo.icon}
                        <span>{statusInfo.text}</span>
                    </div>

                </div>

            </div>
            <Modal isOpen={Open} onClose={() => setOpen(false)} className={"modal-FormAdd"} >
                <FormCompleteDate
                    game={game.id}
                    onClose={() => setOpen(false)}
                    onSuccess={() => {
                        refreshGame();
                        setOpen(false);
                    }}
                />
            </Modal>

        </div>
    );
}

export default BannerGame;