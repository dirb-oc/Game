import { createAchievements } from "../../Controllers/LibraryController";
import { useState, useEffect } from "react";
import "./FormAdd.css";

function FormAchievements({ completeArchi, game, totalArchi, onSuccess, onClose }) {
    const [achievements, setAchievements] = useState(completeArchi);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const Por = totalArchi > 0 ? (achievements * 100) / totalArchi : 0;

    useEffect(() => {
        setAchievements(completeArchi);
    }, [completeArchi]);

    const handleSave = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = { game: game, total_logros: achievements, };

            const response = await createAchievements(data);

            if (response.error) {
                throw new Error(response.error);
            }
            onSuccess?.();

        } catch (err) {
            setError(err.message || "Error al guardar las horas");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Adds">
            <h2>Logros Completados</h2>
            <p className="Modal_text">Ingresa los Logros Completados</p>

            <div className="counter">
                <button onClick={() => setAchievements(Math.max(0, completeArchi - 1))} >-</button>

                <input type="number" value={achievements} onChange={(e) => setAchievements(Math.max(0, Number(e.target.value) || 0))} />

                <button onClick={() => setAchievements(Math.min(totalArchi, achievements + 1))}>
                    +
                </button>
            </div>

            <div className="Difer">{Por.toFixed(0)}% completado</div>

            {error && <p className="error-text">{error}</p>}

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

export default FormAchievements;