import { setFechaTerminado } from "../Controller/libraryController";
import { useEffect, useState } from "react";
import { MdDateRange } from "react-icons/md";

function DateModal({ open, onClose, gameId, onSaved }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => { if (e.key === "Escape") { onClose();}};

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown); }, [open, onClose]);

    if (!open) return null;

 

    const today = new Date().toISOString().split("T")[0];


  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      await setFechaTerminado({id: gameId,fecha: today,});
      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Error al guardar el dia");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Juego Terminado</h2>
        <p className="Modal_text">¿Terminaste este juego?</p>

        <div className="date-box">
          <MdDateRange className="IconDate" />
          <span className="date-label">Fecha de finalización</span>
          <span className="date-value">{today}</span>
        </div>

        {error && <p className="error-text">{error}</p>}
        <div className="modal-actions">
          <button className="btn-outline" onClick={onClose} disabled={loading}>
            Cancelar
          </button>
          <button className="btn-primary" onClick={handleSave} disabled={loading}>
            {loading ? "Guardando..." : "Aceptar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DateModal;