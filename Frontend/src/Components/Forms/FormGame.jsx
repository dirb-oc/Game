import { handleFormattedPriceChange } from "../../Services/formatters";
import { Multi_Styles } from "../../Services/Styles";
import { useRef } from "react";
import Select from "react-select";
import "./FormGame.css";

function FormGame({form,setForm,preview,setPreview,genres,onSubmit,submitText,onClose,}) {

    const yearInputRef = useRef(null);

    const genreOptions = genres.map(g => ({
        value: g.id,
        label: g.genero
    }));

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox"
                ? checked
                : value
        }));
    };

    const handleGenreChange = (selectedOptions) => {
        setForm(prev => ({
            ...prev,
            generos: selectedOptions
                ? selectedOptions.map(option => option.value)
                : []
        }));
    };

    const handleYearInput = (e) => {
        const year = e.target.value;

        setForm(prev => ({
            ...prev,
            lanzamiento: year
        }));

        if (
            year >= 1970 &&
            year <= new Date().getFullYear()
        ) {
            e.target.setCustomValidity("");
        }
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

                    if (
                        prev[field] &&
                        prev[field].startsWith?.("blob:")
                    ) {
                        URL.revokeObjectURL(prev[field]);
                    }

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

    return (
        <>
            <div className="ImageWrapper">

                <div className="Image">
                    {preview.imagen ? (
                        <img
                            src={preview.imagen}
                            alt="Preview banner"
                        />
                    ) : (
                        <span className="placeholder-text">
                            Vista previa
                        </span>
                    )}
                </div>

                <div className="ImageP">
                    {preview.imagenP ? (
                        <img
                            src={preview.imagenP}
                            alt="Preview portada"
                        />
                    ) : (
                        <span className="placeholder-text">
                            Vista previa
                        </span>
                    )}
                </div>

            </div>

            <form
                onSubmit={(e) =>
                    onSubmit(e, yearInputRef)
                }
                className="Form"
            >

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

                        <input
                            type="number"
                            ref={yearInputRef}
                            name="lanzamiento"
                            placeholder="2019"
                            value={form.lanzamiento}
                            onChange={handleYearInput}
                            required
                        />
                    </div>

                    <div className="Element_Group">
                        <label>Precio</label>

                        <input
                            type="text"
                            name="precio"
                            value={form.precioFormatted}
                            placeholder="$12.000"
                            onChange={(e) =>
                                handleFormattedPriceChange(
                                    e,
                                    setForm
                                )
                            }
                        />
                    </div>

                    <div className="Element_Group">
                        <label>Almacenamiento</label>

                        <input
                            type="number"
                            name="almacenamiento"
                            placeholder="10"
                            value={form.almacenamiento}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="Element_Group">
                        <label>Logros</label>

                        <input
                            type="number"
                            name="logros_Cantidad"
                            value={form.logros_Cantidad}
                            onChange={handleChange}
                        />
                    </div>

                </div>

                <div className="separator" />

                <label className="Label_Modal">
                    Géneros
                </label>

                <Select
                    options={genreOptions}
                    styles={Multi_Styles}
                    isMulti
                    value={genreOptions.filter(option =>
                        form.generos.includes(option.value)
                    )}
                    onChange={handleGenreChange}
                    className="Selector"
                    placeholder="Seleccionar géneros"
                />

                <div className="Element_Group">
                    <label>Descripción</label>

                    <textarea
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                        placeholder="Descripción del juego"
                    />
                </div>

                <div className="Box_Image">

                    <div className="Element_Group">
                        <label>Banner</label>

                        <div className="ImageInput">
                            <p
                                onPaste={(e) =>
                                    handlePasteImage(
                                        e,
                                        "imagen"
                                    )
                                }
                            >
                                Pega una imagen aquí
                            </p>
                        </div>
                    </div>

                    <div className="Element_Group">
                        <label>Portada</label>

                        <div className="ImageInput">
                            <p
                                onPaste={(e) =>
                                    handlePasteImage(
                                        e,
                                        "imagenP"
                                    )
                                }
                            >
                                Pega una imagen aquí
                            </p>
                        </div>
                    </div>

                </div>

                <div className="FormButtons">
                    <button
                        type="button"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                    <button type="submit">
                        {submitText}
                    </button>
                </div>

            </form>
        </>
    );
}

export default FormGame;