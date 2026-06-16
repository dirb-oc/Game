import { createGame, loadGenres } from "../../Controllers/LibraryController";
import { useEffect, useState } from "react";
import FormGame from "./FormGame";

function FormCreateGame({ onClose, onSuccess }) {

    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [preview, setPreview] = useState({
        imagen: null,
        imagenP: null,
    });

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

    useEffect(() => {
        loadGenres(
            setGenres,
            setLoading,
            setError
        );
    }, []);

    const handleSubmit = async (
        e,
        yearInputRef
    ) => {

        e.preventDefault();

        const year = parseInt(
            form.lanzamiento
        );

        const input =
            yearInputRef.current;

        if (
            isNaN(year) ||
            year < 1970 ||
            year > new Date().getFullYear()
        ) {
            input.setCustomValidity(
                "El valor debe ser superior o igual a 1970"
            );

            input.reportValidity();

            return;
        }

        input.setCustomValidity("");

        const dataToSend = {
            nombre: form.nombre,
            lanzamiento: `${form.lanzamiento}-02-01`,
            precio:
                parseFloat(form.precio) || 0,
            almacenamiento:
                parseFloat(
                    form.almacenamiento
                ) || 0,
            logros_Cantidad:
                form.logros_Cantidad || null,
            fecha_terminado: null,
            generos_ids: form.generos,
            imagen: form.imagen,
            imagenP: form.imagenP,
            descripcion: form.descripcion,
        };

        try {

            await createGame(dataToSend);

            onSuccess?.();

        } catch (error) {

            console.error(error);

            alert(
                "Error al crear el juego."
            );
        }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <FormGame
            form={form}
            setForm={setForm}
            preview={preview}
            setPreview={setPreview}
            genres={genres}
            submitText="Crear"
            onSubmit={handleSubmit}
            onClose={onClose}
        />
    );
}

export default FormCreateGame;