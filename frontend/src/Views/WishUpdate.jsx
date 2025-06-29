import { useEffect, useRef, useState } from "react";
import { updateWish } from "../Controller/WishController";
import { Multi_Styles } from "../Utils/Utils";
import Select from "react-select";
import "../Components/Create.css";

const WishUpdate = ({ game, onClose }) => {
  const [form, setForm] = useState({ ...game });
  const [formattedPrice, setFormattedPrice] = useState("");
  const [formattedPriceM, setFormattedPriceM] = useState("");
  const yearInputRef = useRef(null);

  const requisitos = [
    { value: "Minimo", label: "Minimos" },
    { value: "Medio", label: "Medios" },
    { value: "Alto", label: "Altos" },
  ];

  useEffect(() => {
    if (game) {
      const selectedRequisitos = requisitos.find(
        r => r.value.toLowerCase() === game.requisitos?.toLowerCase()
      );

      setForm({
        ...game,
        requisitos: selectedRequisitos || null,
      });

      setFormattedPrice(Number(game.precio).toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      }));

      setFormattedPriceM(Number(game.minimo).toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      }));
    }
  }, [game]);

  const handleRequisitosChange = (selectedOption) => {
    setForm(prev => ({ ...prev, requisitos: selectedOption }));
  };

  const handleFormattedMinimoChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    const formatted = Number(raw).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });
    setFormattedPriceM(formatted);
    setForm(prev => ({ ...prev, minimo: raw }));
  };


  const handleFormattedPriceChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    const formatted = Number(raw).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });
    setFormattedPrice(formatted);
    setForm(prev => ({ ...prev, precio: raw }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleYearInput = (e) => {
    const year = e.target.value;
    setForm(prev => ({ ...prev, lanzamiento: year }));
    const input = e.target;
    if (year >= 1970 && year <= new Date().getFullYear()) input.setCustomValidity("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const year = parseInt(form.lanzamiento);
    const input = yearInputRef.current;
    if (isNaN(year) || year < 1970 || year > new Date().getFullYear()) {
      input.setCustomValidity("El año debe ser entre 1970 y el actual.");
      input.reportValidity();
      return;
    }
    input.setCustomValidity("");

    const dataToSend = {
      nombre: form.nombre,
      lanzamiento: `${year}-02-01`,
      precio: parseFloat(form.precio),
      almacenamiento: parseFloat(form.almacenamiento),
      minimo: parseFloat(form.minimo),
      requisitos: form.requisitos?.value || "",
    };

    try {
      await updateWish(form.id, dataToSend);
      window.location.reload();
      onClose();
    } catch (error) {}
  };

  return (
    <div className="background" onClick={onClose}>
      <div className="Modal" onClick={(e) => e.stopPropagation()}>
        <h3>Editar Juego Deseado</h3>
        <p>Cambia los campos deseados</p>
        <form onSubmit={handleSubmit} className="Form">

          <div className="Element_Group">
            <label>Nombre</label>
            <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
          </div>

          <div class="separator" />


          <div className="Box_Group">
            <div className="Element_Group">
              <label>Precio</label>
              <input type="text" name="precio" value={formattedPrice} onChange={handleFormattedPriceChange} />
            </div>

            <div className="Element_Group">
              <label>Precio con descuento</label>
              <input type="text" name="minimo" value={formattedPriceM} onChange={handleFormattedMinimoChange} />
            </div>
            
          </div>

          <div class="separator" />


          <div className="Element_Group">
            <label>Requisitos</label>
            <Select
              styles={Multi_Styles}
              options={requisitos}
              value={form.requisitos}
              onChange={handleRequisitosChange}
              placeholder="Seleccionar requisitos"
            />
          </div>

          <div class="separator" />


          <div className="Box_Group">
            <div className="Element_Group">
              <label>Año de Lanzamiento</label>
              <input type="number" name="lanzamiento" value={form.lanzamiento} onChange={handleYearInput} ref={yearInputRef} required />
            </div>

            <div className="Element_Group">
              <label>Almacenamiento</label>
              <input type="number" name="almacenamiento" value={form.almacenamiento} onChange={handleChange} />
            </div>
          </div>

          <div className="FormButtons">
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WishUpdate;