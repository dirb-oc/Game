import { useEffect, useState, useRef } from "react";
import { loadGenres } from "../Controller/GenreController";
import { updateGame } from "../Controller/libraryController";
import { Multi_Styles } from "../Utils/Utils";
import Select from "react-select";
import "../Components/Create.css";

const UpdateLibrary = ({ game }) => {
  const [genres, setGenres] = useState([]);
  const [form, setForm] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const yearInputRef = useRef(null);

  useEffect(() => {
    loadGenres(setGenres);
  }, []);

  useEffect(() => {
    if (game) {
      setForm({
        nombre: game.nombre,
        lanzamiento: new Date(game.lanzamiento).getFullYear(),
        precio: game.precio,
        precioFormatted: Number(game.precio).toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
        }),
        almacenamiento: game.almacenamiento,
        tiempo: game.tiempo,
        logros_Cantidad: game.logros_Cantidad != null ? parseInt(game.logros_Cantidad) : "",
        logros_Completados: game.logros_Completados != null ? parseInt(game.logros_Completados) : "",
        terminado: game.terminado,
        generos: game.J_genero.map(g => g.id),
        imagen: game.imagen || "",
        imagenP: game.imagenP || "",
        descripcion: game.descripcion || "",
      });
    }
  }, [game]);

  if (!form) return <button className="Create" disabled>Cargando...</button>;

  const genreOptions = genres.map(g => ({ value: g.id, label: g.genero }));

  const handleInputChange = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleGenreChange = (selectedOptions) => {
    setForm(prev => ({ ...prev, generos: selectedOptions.map(opt => opt.value) }));
  };

  const handleYearInput = (e) => {
    const year = e.target.value;
    setForm(prev => ({ ...prev, lanzamiento: year }));
    const input = e.target;
    if (year >= 1970 && year <= new Date().getFullYear()) input.setCustomValidity("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      nombre: form.nombre,
      lanzamiento: `${form.lanzamiento}-02-01`,
      precio: parseFloat(form.precio) || 0,
      almacenamiento: parseFloat(form.almacenamiento) || 0,
      tiempo: parseFloat(form.tiempo) || 0,
      logros_Cantidad: form.logros_Cantidad || null,
      logros_Completados: form.logros_Completados || null,
      terminado: form.terminado,
      generos_ids: form.generos,
      imagen: form.imagen,
      imagenP: form.imagenP,
      descripcion: form.descripcion,
    };

    try {
      await updateGame(game.id, dataToSend);
      window.location.reload();
      setModalOpen(false)();
    } catch (error) {
    }
  };

  if (!form) return null;

  return (
    <>
    <div className="Content_Edit">
      <button className="Edit" onClick={() => setModalOpen(true)}>Editar Juego</button>
    </div>

    {modalOpen && (
    <div className="background" onClick={() => setModalOpen(false)}>
      <div className="Modal" onClick={(e) => e.stopPropagation()}>
        <h3>Editar Videojuego</h3>
        <p>Cambia la información del videojuego</p>
        <form onSubmit={handleSubmit} className="Form">
              <div className="Box_Group">
                <div className="Element_Group">
                  <label>Nombre del Juego</label>
                  <input type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
        
                <div className="Element_Group">
                  <label>Año de lanzamiento</label>
                  <input type="number"
                    ref={yearInputRef}
                    name="lanzamiento"
                    placeholder="2019"
                    value={form.lanzamiento}
                    onChange={handleYearInput}
                    required
                  />
                </div>
              </div>

              <div className="Box_Group">
                <div className="Element_Group">
                  <label>Precio</label>
                  <input
                    type="text"
                    name="precio"
                    value={form.precioFormatted}
                    onChange={handleFormattedPriceChange}
                  />
                </div>
                <div className="Element_Group">
                  <label>Almacenamiento</label  >
                  <input type="number" name="almacenamiento" value={form.almacenamiento} onChange={handleChange} />
                </div>
              </div>

              <div class="separator" />

              <div className="Box_Group">
                <div className="Element_Group">
                  <label>Tiempo jugado</label>
                  <input type="number" name="tiempo" value={form.tiempo} onChange={handleChange} />
                </div>
                <div className="Element_Group">

                  <label>Estado</label>
              <div className="switch-wrapper">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={form.terminado}
                    onChange={(e) => handleInputChange("terminado", e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
                <span className="switch-label">
                  {form.terminado ? "Terminado" : "Sin terminar"}
                </span>
              </div>
                </div>
              </div>

              <div class="separator" />

              <div className="Box_Group">
                <div className="Element_Group">
                  <label>Logros - Total</label>
                  <input type="number" name="logros_Cantidad" value={form.logros_Cantidad} onChange={handleChange} />
                </div>
                
                <div className="Element_Group">
                  <label>Logros - Completados</label>
                  <input type="number" name="logros_Completados" value={form.logros_Completados} onChange={handleChange} />
                </div>
                
              </div>

              <div class="separator" />

              <label>Géneros</label>
              <Select options={genreOptions}
                styles ={Multi_Styles}
                isMulti
                value={genreOptions.filter(opt => form.generos.includes(opt.value))}
                onChange={handleGenreChange}
                className="Selector"
                placeholder="Seleccionar géneros"
              />

              <div class="separator" />
              
              <div className="Element_Group">
                <label>Descripcion</label>
                <textarea type="text" name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripcion del juego"/>
              </div>

              <div class="separator" />
              
              <div className="Element_Group">
                <label>Banner</label>
                <input type="text" name="imagen" value={form.imagen} onChange={handleChange} placeholder="https://ejemplo.com/banner.jpg"/>
                <div className="Image">
                  {form.imagen ? (
                    <img src={form.imagen} alt="Vista previa" />
                  ) : (
                    <span className="placeholder-text">Vista previa</span>
                  )}
                </div>
              </div>

              <div class="separator" />
              
              <div className="Element_Group">
                <label>Portada</label>
                <input type="text" name="imagenP" value={form.imagenP} onChange={handleChange} placeholder="https://ejemplo.com/portada.jpg"/>
                <div className="ImageP">
                  {form.imagenP ? (
                    <img src={form.imagenP} alt="Vista previa" />
                  ) : (
                    <span className="placeholder-text">Vista previa</span>
                  )}
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

export default UpdateLibrary;