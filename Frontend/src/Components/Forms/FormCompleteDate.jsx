import { UpdateGame } from "../../Controllers/LibraryController";
import { MdDateRange } from "react-icons/md";
import { useState } from "react";

function FormCompleteDate({ game, onSuccess, onClose }) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSave = async () => {
        try {
            setLoading(true);
            setError(null);

            const today = new Date()
                .toISOString()
                .split("T")[0];

            await UpdateGame(game, {
                fecha_terminado: today,
            });

            onSuccess?.();

        } catch (err) {
            setError(
                err.message ||
                "Error al marcar el juego como terminado"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Juego Terminado</h2>

            <p className="Modal_text">¿Terminaste este juego?</p>

            <div className="date-box">
                    <MdDateRange className="IconDate" />
                    <span className="date-value">{new Date().toLocaleDateString("es-CO")}</span>
                    <span className="date-label">Fecha de finalización</span>
                </div>

            {error && (
                <p className="error-text">
                    {error}
                </p>
            )}

            <div className="modal-actions">
                <button className="btn-outline" onClick={onClose} >
                    Cancelar
                </button>
                <button
                    className="btn-primary"
                    onClick={handleSave}
                    disabled={loading}
                >
                    {loading
                        ? "Guardando..."
                        : "Confirmar"}
                </button>
            </div>
        </div>
    );
}

export default FormCompleteDate;