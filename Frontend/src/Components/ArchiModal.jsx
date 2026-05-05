import { useEffect, useState } from "react";
import { postAchievements } from "../Controller/achievementController";

function ArchiModal({ open, onClose, Archi, setArchi, gameId, onSaved, total }) {
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

    return () => document.removeEventListener("keydown", handleKeyDown); }, [open, onClose]);

  if (!open) return null;

  const setArchiSafe = (value) => {
    if (value < 0) return;
    if (total !== null && value > total) return;
    setArchi(value);
  };

  const dif = ((Archi*100)/total).toFixed(0);

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      await postAchievements({gameId,totalLogros: Archi,});
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
        <h2>Logros Completados</h2>
        <p className="Modal_text">Ingresa los logros conseguidos</p>

        <div className="counter">
          <button onClick={() => setArchiSafe(Archi - 1)}>-</button>
          <input type="number" value={Archi}onChange={(e) =>setArchiSafe(Number(e.target.value) || 0)} />
          <button onClick={() => setArchiSafe(Archi + 1)}>+</button>
        </div>

        <div className="Difer">{dif}% Completado</div>

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

export default ArchiModal;