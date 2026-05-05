import { useState, useRef } from "react";
import { createWish } from "../Controller/WishController";
import { Multi_Styles} from "../Utils/Utils";
import Select from "react-select";
import "../Components/Create.css";

const WishCreate = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const yearInputRef = useRef(null);

  const [form, setForm] = useState({
    nombre: "",
    lanzamiento: "",
    precio: "",
    precioFormatted: "",
    minimo: "",
    minimoFormatted: "",
    almacenamiento: "",
    requisitos: null,
  });

  const requisitos = [
    { value: "Minimo", label: "Mínimos" },
    { value: "Medio", label: "Medios" },
    { value: "Alto", label: "Altos" },
  ];

  const handleRequisitosChange = (selectedOption) => {
    setForm(prev => ({ ...prev, requisitos: selectedOption }));
  };

  const handleFormattedPriceChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    const formatted = Number(raw).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });
    setForm(prev => ({ ...prev, precioFormatted: formatted, precio: raw }));
  };

  const handleFormattedMinimoChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    const formatted = Number(raw).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });
    setForm(prev => ({ ...prev, minimoFormatted: formatted, minimo: raw }));
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

  // Validación del año (solo si se ingresó)
  if (form.lanzamiento && (isNaN(year) || year < 1970 || year > new Date().getFullYear())) {
    input.setCustomValidity("El valor debe ser superior o igual a 1970");
    input.reportValidity();
    return;
  }
  input.setCustomValidity("");

  const dataToSend = {
    nombre: form.nombre,
    lanzamiento: form.lanzamiento ? `${year}-01-01` : null,
    precio: form.precio ? parseFloat(form.precio) : null,
    almacenamiento: form.almacenamiento ? parseFloat(form.almacenamiento) : null,
    minimo: form.minimo ? parseFloat(form.minimo) : null,
    requisitos: form.requisitos?.value || null,
  };

  try {
    await createWish(dataToSend);
    setModalOpen(false);
    window.location.reload();
  } catch (error) {
    alert("Error al agregar el juego deseado.");
  }
};

  return (
    <>
      <button className="Create" onClick={() => setModalOpen(true)}>Agregar Deseado</button>

      {modalOpen && (
        <div className="background" onClick={() => setModalOpen(false)}>
          <div className="Modal" onClick={(e) => e.stopPropagation()}>
            <h3>Agregar a Deseados</h3>
            <p>Completa la información del videojuego deseado</p>
            <form onSubmit={handleSubmit} className="Form">

              <div className="Element_Group">
                <label>Nombre del Juego</label>
                <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
              </div>

              <div class="separator" />

              <div className="Box_Group">
                <div className="Element_Group">
                  <label>Precio</label>
                  <input type="text" name="precio" placeholder="$50.000" value={form.precioFormatted} onChange={handleFormattedPriceChange} />
                </div>
                <div className="Element_Group">
                  <label>Precio con descuento</label>
                  <input type="text" name="minimo" placeholder="$25.000" value={form.minimoFormatted} onChange={handleFormattedMinimoChange} />
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
                  <label>Año de lanzamiento</label>
                  <input type="number"
                    ref={yearInputRef}
                    name="lanzamiento"
                    placeholder="2019"
                    value={form.lanzamiento}
                    onChange={handleYearInput}
                  />
                </div>

                <div className="Element_Group">
                  <label>Almacenamiento</label>
                  <input type="number" name="almacenamiento" placeholder="30 GB" value={form.almacenamiento} onChange={handleChange} />
                </div>
              </div>

              <div className="FormButtons">
                <button type="button" onClick={() => setModalOpen(false)}>Cancelar</button>
                <button type="submit">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default WishCreate;
