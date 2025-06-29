import { useEffect, useState } from "react";
import { loadWish } from "../Controller/WishController";
import { loadGames } from "../Controller/libraryController"
import { Selector_Styles, formatoMoneda} from "../Utils/Utils";
import { IoMdPricetag } from "react-icons/io";
import { GiBullseye } from "react-icons/gi";
import { MdOutlineAttachMoney, MdOutlineStorage } from "react-icons/md";
import { Link } from "react-router-dom";
import Buscador from "../Components/Buscador";
import Table from "../Components/Table";
import Tarjet from "../Components/Tarjet";
import WishCreate from "./WishCreate";
import Select from "react-select";
import WishUpdate from "./WishUpdate";

const WishView = () => {
  const [wishRaw, setWishRaw] = useState([]);
  const [games, setGames] = useState([]);
  const [wishFiltered, setWishFiltered] = useState([]);
  const [selectedWish, setSelectedWish] = useState(null);

  const [orderBy, setOrderBy] = useState("Nombre");
  const [filterBy, setFilterBy] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const opcionesOrden = [
    { value: "Nombre", label: "Nombre" },
    { value: "Lanzamiento", label: "Lanzamiento" },
    { value: "Precio", label: "Precio" },
    { value: "Almacenamiento", label: "Almacenamiento" },
  ];

  const opcionesFiltro = [
    { value: "Todos", label: "Todos" },
    { value: "Minimo", label: "Requisitos Mínimos" },
    { value: "Medio", label: "Requisitos Medios" },
    { value: "Alto", label: "Requisitos Altos" },
  ];

  const procesarDatos = (datos) => {
  return datos.map((item) => {
    const precio = Number(item.precio || 0);
    const precio_minimo = Number(item.minimo || 0);

    // Corrige año
    const lanzamiento = item.lanzamiento
      ? new Date(item.lanzamiento).getFullYear()
      : "-";

    // Corrige almacenamiento
    const almacenamientoNum = parseFloat(item.almacenamiento);
    const almacenamientoFormateado = !isNaN(almacenamientoNum)
      ? (almacenamientoNum % 1 === 0
          ? `${parseInt(almacenamientoNum)} GB`
          : `${almacenamientoNum.toFixed(1)} GB`)
      : "-";

    return {
      ...item,
      lanzamiento,
      precio: precio > 0 ? formatoMoneda(precio) : "-",
      minimo: precio_minimo > 0 ? formatoMoneda(precio_minimo) : "-",
      descuento:
        precio > 0 && precio_minimo > 0
          ? `${Math.round(((precio - precio_minimo) / precio) * 100)}%`
          : "-",
      almacenamiento: almacenamientoFormateado,
    };
  });
};

  useEffect(() => {
    loadWish((data) => {
      const procesado = procesarDatos(data);
      setWishRaw(procesado);
    });
    loadGames(setGames);
  }, []);

  useEffect(() => {
    let data = [...wishRaw];

    // Filtro por búsqueda
    if (searchTerm) {
      data = data.filter((item) =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por requisitos
    if (filterBy !== "Todos") {
      data = data.filter((item) => item.requisitos === filterBy);
    }

    // Ordenamiento
    switch (orderBy) {
      case "Nombre":
        data.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case "Lanzamiento":
        data.sort((a, b) => a.lanzamiento - b.lanzamiento);
        break;
      case "Precio":
        data.sort(
          (a, b) =>
            Number(a.minimo.replace(/\D/g, "")) -
            Number(b.minimo.replace(/\D/g, ""))
        );
        break;
      case "Almacenamiento":
        data.sort((a, b) => {
          const valA = parseFloat(a.almacenamiento);
          const valB = parseFloat(b.almacenamiento);
          return valA - valB;
        });
        break;
      default:
        break;
    }

    setWishFiltered(data);
  }, [wishRaw, searchTerm, filterBy, orderBy]);

	const camposOrdenados = [
    "nombre",
    "lanzamiento",
    "precio",
    "minimo",
    "descuento",
    "requisitos",
    "almacenamiento"
  ];

  // Solo juegos con precios válidos
  const juegosConPrecio = wishFiltered.filter(juego => juego.precio !== "-" && juego.minimo !== "-");

  // Total y promedio de precio
  const TotalPrecio = juegosConPrecio.reduce( (acc, juego) => acc + Number(juego.precio.replace(/\D/g, "")),0);
  const PromedioPrecio = juegosConPrecio.length > 0 ? parseInt(TotalPrecio / juegosConPrecio.length) : 0;

  // Total y porcentaje de descuento
  const TotalMinimo = juegosConPrecio.reduce( (acc, juego) => acc + Number(juego.minimo.replace(/\D/g, "")), 0 );
  const porcentaje = TotalPrecio > 0 ? ((TotalPrecio - TotalMinimo) / TotalPrecio) * 100 : 0;
  const juegosConAlmacenamiento = wishFiltered.filter(juego => juego.almacenamiento !== "-");
  const TotalAlmacenamiento = juegosConAlmacenamiento.reduce( (acc, juego) => acc + parseFloat(juego.almacenamiento), 0 ).toFixed(1);
  const PromedioAlmacenamiento = juegosConAlmacenamiento.length > 0 ? (TotalAlmacenamiento / juegosConAlmacenamiento.length).toFixed(1) : "0.0";

  return (
    <>
      <div className="Title">
        <h1>Lista de Deseados</h1>
        <p>
          Videojuegos deseados - ver la <Link to="/" className="List">Colección</Link> o las <Link to="/estadisticas" className="Stats">Estadísticas</Link>.
        </p>

      </div>

      <div className="Tarjet_Container">
        <Tarjet 
          title="Juegos Deseados"
          Value={wishFiltered.length}
          Subvalue={`${games.length} Coleccionados`}
          icon = {<GiBullseye />}
          color = {"Azul"}
        />

        <Tarjet 
          title = "Precio Total"
          Value = {formatoMoneda(TotalPrecio)}
          Subvalue = {`Promedio: ${formatoMoneda(PromedioPrecio)}`}
          icon = {<MdOutlineAttachMoney />}
          color = {"Verde"}
        />

        <Tarjet title = "Precio con Descuento"
          Value = {formatoMoneda(TotalMinimo)}
          Subvalue = {`Porcentaje: ${Math.round(porcentaje)}%`}
          icon = {<IoMdPricetag  />}
          color = {'Violeta'}
        />
        
        <Tarjet title = "Almacenamiento Total"
          Value = {`${TotalAlmacenamiento} GB`}
          Subvalue = {`Promedio: ${PromedioAlmacenamiento} GB`}
          icon = {<MdOutlineStorage />}
          color = {"Naranja"}
        />
      </div>

      <br />

      <div className="Menu_Tool">
        <div className="Tool_Group">
          <Buscador onChange={(e) => setSearchTerm(e.target.value)} />
          <Select
            styles={Selector_Styles}
            options={opcionesOrden}
            value={opcionesOrden.find((opt) => opt.value === orderBy)}
            onChange={(selected) => setOrderBy(selected.value)}
            placeholder="Ordenar por"
          />
          <Select
            styles={Selector_Styles}
            options={opcionesFiltro}
            value={opcionesFiltro.find((opt) => opt.value === filterBy)}
            onChange={(selected) => setFilterBy(selected.value)}
            placeholder="Filtrar por"
          />
        </div>
				<WishCreate />
      </div>

      <div className="Content_Table">
				<Table
  data={wishFiltered}
  onRowClick={(game) => {
    const cleaned = {
      ...game,
      precio: Number(game.precio.replace(/\D/g, "")),
      minimo: Number(game.minimo.replace(/\D/g, "")),
      almacenamiento: parseFloat(game.almacenamiento),
    };
    setSelectedWish(cleaned);
  }}
  columns={camposOrdenados}
/>

        
        {selectedWish && (
  <WishUpdate
    game={selectedWish}
    onClose={() => setSelectedWish(null)}
  />
)}

      </div>
    </>
  );
};

export default WishView;