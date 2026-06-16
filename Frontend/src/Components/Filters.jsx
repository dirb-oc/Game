import { useState } from "react";
import FormCreateGame from "./Forms/FormCreateGame"
import Modal from "./Modal";
import "./Filters.css";

function Filters({ search, setSearch, status, setStatus, order, setOrder, refreshGames, }) {

    const [open, setOpen] = useState(false);

    return (
        <div className="filters">

            <input
                className="Search"
                type="text"
                placeholder="Buscar juego..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="all">Todos</option>
                <option value="pending">Sin jugar</option>
                <option value="playing">Jugando</option>
                <option value="completed">Completado</option>
            </select>

            <select value={order} onChange={(e) => setOrder(e.target.value)}>
                <option value="az">Nombre A-Z</option>
                <option value="za">Nombre Z-A</option>
                <option value="hours">Más horas</option>
                <option value="price">Mayor precio</option>
                <option value="date release">Más reciente</option>
                <option value="storage">Más almacenamiento</option>
            </select>
            <span className="ButtonCreate" onClick={() => setOpen(true)} >Agregar Juego</span>
            <Modal isOpen={open} onClose={() => setOpen(false)} className={"modal-FormGame"}>
                <FormCreateGame
                    onClose={() => setOpen(false)}
                    onSuccess={() => { refreshGames(); setOpen(false); }}
                />
            </Modal>

        </div>
    );
}

export default Filters;