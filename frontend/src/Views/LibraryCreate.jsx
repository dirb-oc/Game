import { useEffect, useState, useRef } from "react";
import { loadGenres } from "../Controller/GenreController";
import { createGame } from "../Controller/libraryController";
import { Multi_Styles } from "../Utils/Utils";
import Select from "react-select";
import "../Components/Create.css";

const LibraryCreate = () => {
  const [genres, setGenres] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const yearInputRef = useRef(null);
  const [preview, setPreview] = useState({
    imagen: null,
    imagenP: null,
  });

  const genreOptions = genres.map(g => ({ value: g.id, label: g.genero }));

  const [form, setForm] = useState({
    nombre: "",
    lanzamiento: "",
    precio: "",
    precioFormatted: "",
    almacenamiento: "",
    tiempo: "",
    logros_Cantidad: "",
    logros_Completados: "",
    terminado: false,
    generos: [],
    imagen: null,
    imagenP: null,
    descripcion: "",
  });

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
    setForm(prev => ({ ...prev, generos: selectedOptions.map(option => option.value) }));
  };

  const handleYearInput = (e) => {
    const year = e.target.value;
    setForm(prev => ({ ...prev, lanzamiento: year }));
    const input = e.target;
    if (year >= 1970 && year <= new Date().getFullYear()) input.setCustomValidity("");
  };

  const handlePasteImage = (e, field) => {
  const items = e.clipboardData.items;

  for (let item of items) {
    if (item.type.startsWith("image/")) {
      const file = item.getAsFile();

      setForm(prev => ({
        ...prev,
        [field]: file,
      }));

      setPreview(prev => {
        if (prev[field]) URL.revokeObjectURL(prev[field]);

        return {
          ...prev,
          [field]: URL.createObjectURL(file),
        };
      });

      e.preventDefault();
      break;
    }
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const year = parseInt(form.lanzamiento);
    const input = yearInputRef.current;
    if (isNaN(year) || year < 1970 || year > new Date().getFullYear()) {
      input.setCustomValidity("El valor debe ser superior o igual a 1970");
      input.reportValidity();
      return;
    }
    input.setCustomValidity("");

    const dataToSend = {
      nombre: form.nombre,
      lanzamiento: `${form.lanzamiento}-02-01`,
      precio: parseFloat(form.precio) || 0,
      almacenamiento: parseFloat(form.almacenamiento) || 0,
      logros_Cantidad: form.logros_Cantidad || null,
      fecha_terminado: null,
      generos_ids: form.generos,
      imagen: form.imagen,
      imagenP: form.imagenP,
      descripcion: form.descripcion,
    };

    try {
      await createGame(dataToSend);
      setModalOpen(false);
      window.location.reload();
    } catch (error) {
      alert("Error al crear el juego.");
      console.log(error);
    }
  };

  useEffect(() => {
    loadGenres(setGenres);
  }, []);

  return (
    <>
      <button className="Create" onClick={() => setModalOpen(true)}>Agregar Juego</button>

      {modalOpen && (
        <div className="background" onClick={() => setModalOpen(false)}>

          <div className="Modal" onClick={(e) => e.stopPropagation()}>

            <div className="ImageWrapper">
              <div className="Image">
                {preview.imagen ? (
                  <img src={preview.imagen} alt="Preview banner" />
                ) : (
                  <span className="placeholder-text">Vista previa</span>
                )}
              </div>

              <div className="ImageP">
                {preview.imagenP ? (
                  <img src={preview.imagenP} alt="Preview portada" />
                ) : (
                  <span className="placeholder-text">Vista previa</span>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="Form">
              <input 
                type="text" 
                name="nombre" 
                className="nombreGame" 
                placeholder="Nombre..."
                value={form.nombre} 
                onChange={handleChange} 
                required 
              />

              <div className="Box_Group">
                <div className="Element_Group">
                  <label>Lanzamiento</label>
                  <input type="number" ref={yearInputRef} name="lanzamiento"
                    placeholder="2019" value={form.lanzamiento}
                    onChange={handleYearInput} required />
                </div>

                <div className="Element_Group">
                  <label>Precio</label>
                  <input type="text" name="precio" value={form.precioFormatted}
                    placeholder="$12.000"
                    onChange={handleFormattedPriceChange} />
                </div>

                <div className="Element_Group">
                  <label>Almacenamiento</label>
                  <input type="number" name="almacenamiento"
                    placeholder="10"
                    value={form.almacenamiento} onChange={handleChange} />
                </div>

                <div className="Element_Group">
                  <label>Logros</label>
                  <input type="number" name="logros_Cantidad"
                    value={form.logros_Cantidad}
                    onChange={handleChange} />
                </div>

              </div>

              <div class="separator" />

              <label className="Label_Modal">Géneros</label>
              <Select options={genreOptions} styles={Multi_Styles} isMulti
                onChange={handleGenreChange} className="Selector"
                placeholder="Seleccionar géneros" 
              />

              <div className="Element_Group">
                <label>Descripción</label>
                <textarea type="text" name="descripcion" value={form.descripcion}
                  onChange={handleChange} placeholder="Descripción del juego" />
              </div>

              <div className="Box_Group">
                <div className="Element_Group">
                  <label>Banner</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setForm(prev => ({ ...prev, imagen: e.target.files[0] }))
                    }
                  />
                  <p onPaste={(e) => handlePasteImage(e, "imagen")}>Pega</p>
                </div>
                <div className="Element_Group">
                  <label>Portada</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setForm(prev => ({ ...prev, imagenP: e.target.files[0] }))
                    }
                  />
                  <p onPaste={(e) => handlePasteImage(e, "imagenP")}>Pega</p>
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

export default LibraryCreate;