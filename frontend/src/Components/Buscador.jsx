import { BiSearch } from "react-icons/bi";
import "./Buscador.css";

const Buscador = ({ onChange }) => {
  return (
    <div className="Bloque">
      <div className="buscador-wrapper">
        <BiSearch className="buscador-icon" />
        <input
          type="text"
          placeholder="Buscar Juegos"
          className="buscador-input"
          onChange={onChange}
          />
      </div>
    </div>
  );
};

export default Buscador;