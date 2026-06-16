import { loadGenres, UpdateGame } from "../../Controllers/LibraryController";
import { useEffect, useState } from "react";
import FormGame from "./FormGame";

function FormEditGame({ game, onClose, onSuccess }) {

    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [preview, setPreview] = useState({
        imagen: game.imagen,
        imagenP: game.imagenP,
    });

    const [form, setForm] = useState({
        nombre: game.nombre,
        lanzamiento: new Date(game.lanzamiento).getFullYear().toString(),

        precio: game.precio,
        precioFormatted:
            Number(game.precio).toLocaleString("es-CO"),

        almacenamiento: game.almacenamiento,

        logros_Cantidad:
            game.logros_Cantidad || "",

        generos:
            game.J_genero?.map(g => g.id) || [],

        imagen: null,
        imagenP: null,

        descripcion:
            game.descripcion || "",
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

            lanzamiento:
                `${form.lanzamiento}-02-01`,

            precio:
                parseFloat(form.precio) || 0,

            almacenamiento:
                parseFloat(form.almacenamiento) || 0,

            logros_Cantidad:
                form.logros_Cantidad || null,

            descripcion:
                form.descripcion,

            generos_ids:
                form.generos,
        };

        if (form.imagen) {
            dataToSend.imagen =
                form.imagen;
        }

        if (form.imagenP) {
            dataToSend.imagenP =
                form.imagenP;
        }

        try {

            await UpdateGame(
                game.id,
                dataToSend
            );

            onSuccess?.();

        } catch (error) {

            console.error(error);

            alert(
                "Error al actualizar el juego."
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
            submitText="Guardar cambios"
            onSubmit={handleSubmit}
            onClose={onClose}
        />
    );
}

export default FormEditGame;