import { useEffect, useState } from "react";
import { loadGames } from "../Controller/libraryController";
import { IoGameControllerOutline } from "react-icons/io5";
import { Selector_Styles } from "../Utils/Utils"
import { Link } from 'react-router-dom';
import Buscador from "../Components/Buscador"
import LibraryCreate from "./LibraryCreate";
import Card from "../Components/Card"
import Select from "react-select";


const LibraryView = () => {
  const [games, setGames] = useState([]);
  const [orderBy, setOrderBy] = useState("Nombre");
  const [filterBy, setFilterBy] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const opcionesOrden = [
    { value: "Nombre", label: "Nombre" },
    { value: "Lanzamiento", label: "Lanzamiento" },
    { value: "Horas", label: "Horas" },
    { value: "Precios", label: "Precio" },
    { value: "Almacenamiento", label: "Almacenamiento" },
  ];

  const opcionesFiltro = [
    { value: "Todos", label: "Todos" },
    { value: "Terminados", label: "Terminados" },
    { value: "Jugando", label: "Jugando" },
    { value: "Sin jugar", label: "Sin jugar" },
  ];

  const ordenarJuegos = (lista, criterio) => {
    const copia = [...lista];
    switch (criterio) {
      case "Nombre":
        return copia.sort((a, b) => a.nombre.localeCompare(b.nombre));
      case "Lanzamiento":
        return copia.sort((a, b) => new Date(b.lanzamiento) - new Date(a.lanzamiento));
      case "Horas":
        return copia.sort((a, b) => b.tiempo - a.tiempo);
      case "Precios":
        return copia.sort((a, b) => b.precio - a.precio);
      case "Almacenamiento":
        return copia.sort((a, b) => b.almacenamiento - a.almacenamiento);
      default:
        return copia;
    }
  };

  const filtrarJuegos = (lista, filtro) => {
    switch (filtro) {
      case "Terminados":
        return lista.filter(j => j.terminado);
      case "Jugando":
        return lista.filter(j => j.tiempo > 0 && !j.terminado);
      case "Sin jugar":
        return lista.filter(j => j.tiempo == 0 || j.tiempo == false);
      default:
        return lista;
    }
  };
  
  const buscarJuegos = (lista, texto) => {
    return lista.filter(j => j.nombre.toLowerCase().includes(texto.toLowerCase()));
  };

  const juegosFiltrados = ordenarJuegos(
    filtrarJuegos(buscarJuegos(games, searchTerm),filterBy),orderBy
  );

  useEffect(() => {loadGames(setGames);},[]);

  return (
    <>
      <div className="Title">
        <h1><span className="Icon_Title"><IoGameControllerOutline /></span>Coleccion de Videojuegos</h1>
        <p>
          {juegosFiltrados.length} de {games.length} juegos - ver las <Link to="/estadisticas" className="Stats">Estadísticas</Link> o los <Link to="/deseados" className="Wish">Deseados</Link>.
        </p>
      </div>
      <div className="Menu_Tool">
        <div className="Tool_Group">
          <Buscador onChange={(e) => setSearchTerm(e.target.value)} />
          <Select
            styles={Selector_Styles}
            options={opcionesOrden}
            value={opcionesOrden.find(opt => opt.value === orderBy)}
            onChange={(selected) => setOrderBy(selected.value)}
            placeholder="Ordenar por"
          />
          <Select
            styles={Selector_Styles}
            options={opcionesFiltro}
            value={opcionesFiltro.find(opt => opt.value === filterBy)}
            onChange={(selected) => setFilterBy(selected.value)}
            placeholder="Filtrar por"
          />
        </div>
        <LibraryCreate />
      </div>

      <div className="Card_Container">
        {juegosFiltrados.map((game) => (
          <Link to={`/${game.id}`} key={game.id} style={{ textDecoration: "none", color: "inherit" }}>
            <Card
              id={game.id}
              year={game.lanzamiento}
              time={game.tiempo}
              image={game.imagen}
              title={game.nombre}
              price={game.precio}
              genres={game.J_genero}
              finished={game.terminado}
              storage={game.almacenamiento}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default LibraryView;