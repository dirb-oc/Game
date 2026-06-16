import { loadLibrary } from "../Controllers/LibraryController";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Filters from "../Components/Filters";
import Loading from "../Components/Loading";
import Card from "../Components/Card";

function LibraryView() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [order, setOrder] = useState("az");

    const refreshGames = () => { loadLibrary(setGames, setLoading, setError); };

    useEffect(() => { refreshGames(); }, []);

    if (loading) { return  <Loading text="Cargando Libreria..." />; }
    if (error) { return <h2>{error}</h2>; }

    const filteredGames = games.filter((game) =>
        game.nombre.toLowerCase().includes(search.toLowerCase())).filter((game) => {

            if (status === "all") return true;

            const completed = !!game.fecha_terminado;
            const playing = game.total_horas > 0 && !completed;
            const pending = game.total_horas === 0;

            switch (status) {
                case "completed": return completed;
                case "playing": return playing;
                case "pending": return pending;

                default: return true;
            }
        });

    filteredGames.sort((a, b) => {

        switch (order) {
            case "az": return a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" });
            case "za": return b.nombre.localeCompare(a.nombre, "es", { sensitivity: "base" });
            case "hours": return (Number(b.total_horas) - Number(a.total_horas));
            case "price": return (Number(b.precio) - Number(a.precio));
            case "date release": return (new Date(b.lanzamiento) - new Date(a.lanzamiento));
            case "storage": return (Number(b.almacenamiento) - Number(a.almacenamiento));

            default: return 0;
        }

    });

    return (
        <div className="Base">
            <h1 className="Title">Colección de Videojuegos</h1>
            <p className="SubTitle">{filteredGames.length} de {games.length} Juegos -  Ver <Link to="/stats" className="LinkStats">Estadisticas</ Link></p>

            <Filters
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
                order={order}
                setOrder={setOrder}
                refreshGames={refreshGames}
            />

            <div className="games-grid">
                {filteredGames.map((game) => (<Card key={game.id} game={game} />))}
            </div>
        </div>
    );
}

export default LibraryView;