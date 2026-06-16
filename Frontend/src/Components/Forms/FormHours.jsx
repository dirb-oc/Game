import { useState, useEffect } from "react";
import { createHours } from "../../Controllers/LibraryController";
import "./FormAdd.css";

function FormHours({ currentHours, game, Thours, onClose, onSuccess }) {
    const [hours, setHours] = useState(currentHours);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => { setHours(currentHours); }, [currentHours]);

    const dif = hours - Thours;

    const handleSave = async () => {
        try {
            setLoading(true);
            setError(null);

            await createHours({ game, total_horas: hours, });

            onSuccess?.();

        } catch (err) {
            setError(err.message || "Error al guardar");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Adds">
            <h2>⏱ Horas Jugadas</h2>

            <p className="Modal_text">Ingresa las horas jugadas</p>

            <div className="counter">
                <button onClick={() => setHours(Math.max(0, hours - 1))} >
                    -
                </button>

                <input
                    type="number"
                    value={hours}
                    onChange={(e) => setHours(Math.max(0, Number(e.target.value) || 0))}
                />

                <button onClick={() => setHours(hours + 1)}>
                    +
                </button>
            </div>

            <div className="Difer">{dif} Horas agregadas</div>

            {error && (
                <p className="error-text">{error}</p>
            )}

            <div className="modal-actions">
                <button className="btn-outline" onClick={onClose} >
                    Cancelar
                </button>
                <button className="btn-primary" onClick={handleSave} disabled={loading} >
                    {loading ? "Guardando..." : "Guardar"}
                </button>
            </div>
        </div>
    );
}

export default FormHours;