import { postHours } from "../Controller/playSessionController";
import { useEffect, useState } from "react";

function HoursModal({ open, onClose, hours, setHours, gameId, onSaved, Thours }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  let dif = hours - Thours;

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      await postHours({gameId,hours,});
      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Error al guardar las horas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>⏱ Horas Jugadas</h2>
        <p className="Modal_text">Ingresa las horas jugadas</p>

        <div className="counter">
          <button onClick={() => setHours(Math.max(0, hours - 1))}>-</button>
          <input
            type="number"
            value={hours}
            onChange={(e) =>
              setHours(Math.max(0, Number(e.target.value) || 0))
            }
          />
          <button onClick={() => setHours(hours + 1)}>+</button>
        </div>

        <div className="Difer">{dif} Horas agregadas</div>

        {error && <p className="error-text">{error}</p>}

        <div className="modal-actions">
          <button className="btn-outline" onClick={onClose} disabled={loading}>
            Cancelar
          </button>
          <button
            className="btn-primary"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HoursModal;