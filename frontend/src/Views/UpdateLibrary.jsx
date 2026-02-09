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
  const [preview, setPreview] = useState({imagen: null,imagenP: null,});

  useEffect(() => {
    loadGenres(setGenres);
  }, []);

  useEffect(() => {
    if (game) {
      setPreview({
      imagen: game.imagen || null,
      imagenP: game.imagenP || null,
    });
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

  const handlePasteImage = (e, field) => {
    const items = e.clipboardData.items;
    for (let item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();

        setForm(prev => ({
          ...prev,
          [field]: file,
        }));
        setPreview(prev => ({
          ...prev,
          [field]: URL.createObjectURL(file),
        }));
      }
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

formData.append("nombre", form.nombre);
formData.append("lanzamiento", `${form.lanzamiento}-02-01`);
formData.append("precio", parseFloat(form.precio) || 0);
formData.append("almacenamiento", parseFloat(form.almacenamiento) || 0);
formData.append("descripcion", form.descripcion || "");

form.generos.forEach(id => formData.append("generos_ids", id));

// ⚠️ solo enviar imagen si es File
if (form.imagen instanceof File) {
  formData.append("imagen", form.imagen);
}

if (form.imagenP instanceof File) {
  formData.append("imagenP", form.imagenP);
}

    try {
      await updateGame(game.id, formData);
      window.location.reload();
      setModalOpen(false);
    } catch (error) {
    }
  };

  if (!form) return null;

  return (
    <>
      <div className="Content_Edit">
        <button className="Edit" onClick={() => setModalOpen(true)}>Editar</button>
      </div>

      {modalOpen && (
        <div className="background" onClick={() => setModalOpen(false)}>
          <div className="Modal" onClick={(e) => e.stopPropagation()}>
            <div className="ImageWrapper">
              <div className="Image">
                {preview.imagen ? (
                  <img src={preview.imagen} alt="Vista previa" />
                ) : (
                  <span className="placeholder-text">Vista previa</span>
                )}
              </div>
          
              <div className="ImageP">
                {preview.imagenP ? (
                  <img src={preview.imagenP} alt="Vista previa" />
                ) : (
                  <span className="placeholder-text">Vista previa</span>
                )}
              </div>
            </div>

        <form onSubmit={handleSubmit} className="Form">
          <input type="text"
            name="nombre"
            className="nombreGame"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          <div className="Box_Group">
            <div className="Element_Group">
              <label>Lanzamiento</label>
              <input className="value" type="number" ref={yearInputRef} name="lanzamiento" placeholder="2019" value={form.lanzamiento} onChange={handleYearInput} required />
            </div>
            <div className="Element_Group">
              <label>Precio</label>
              <input className="value" type="text" name="precio" value={form.precioFormatted} onChange={handleFormattedPriceChange} required />
            </div>

            <div className="Element_Group">
              <label>Almacenamiento</label  >
              <input className="value" type="number" name="almacenamiento" value={form.almacenamiento} onChange={handleChange} required />
            </div>

            <div className="Element_Group">
              <label>Logros</label>
              <input className="value" type="number" name="logros_Cantidad" value={form.logros_Cantidad} onChange={handleChange} />
            </div>
          </div>

          <div class="separator" />

              <label className="Label_Modal">Géneros</label>
              <Select options={genreOptions}
                styles ={Multi_Styles}
                isMulti
                value={genreOptions.filter(opt => form.generos.includes(opt.value))}
                onChange={handleGenreChange}
                className="Selector"
                placeholder="Seleccionar géneros"
              />
              
              <div className="Element_Group">
                <label>Descripcion</label>
                <textarea type="text" name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripcion del juego"/>
              </div>

              <div className="Box_Group">
                <div className="Element_Group">
                <label>Banner</label>
                <div
  className="ImageInput"
  onPaste={(e) => handlePasteImage(e, "imagen")}
  tabIndex={0}
>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];
      if (!file) return;

      setForm(prev => ({ ...prev, imagen: file }));
      setPreview(prev => ({ ...prev, imagen: URL.createObjectURL(file) }));
    }}
  />
  <small>Pega, arrastra o selecciona una imagen</small>
</div>


              </div>
              <div className="Element_Group">
                <label>Portada</label>
                <div
  className="ImageInput"
  onPaste={(e) => handlePasteImage(e, "imagenP")}
  tabIndex={0}
>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];
      if (!file) return;

      setForm(prev => ({ ...prev, imagenP: file }));
      setPreview(prev => ({ ...prev, imagenP: URL.createObjectURL(file) }));
    }}
  />
  <small>Pega, arrastra o selecciona una imagen</small>
</div>

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