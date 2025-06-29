import "./Table.css";

const Table = ({ data, onRowClick, columns }) => {
  if (!data || data.length === 0) {
    return <p className="Not_Found">No hay datos disponibles</p>;
  }

  const CamposOcultos = ["id"];

  const headers = columns
    ? columns
    : Object.keys(data[0]).filter((key) => !CamposOcultos.includes(key));

    const getDescuentoClass = (valor) => {
  const num = parseInt(valor.replace("%", ""));
  if (num > 50) return "descuento-alto";
  if (num >= 25) return "descuento-medio";
  return "descuento-bajo";
};

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, idx) => (
            <th key={idx}>{header.replace(/_/g, " ")}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} onClick={() => onRowClick?.(row)} style={{ cursor: onRowClick ? "pointer" : "default" }}>
            {headers.map((header, idx) => (
              <td key={idx}>
                {header === "descuento" ? (
                  <span className={`descuento-tag ${getDescuentoClass(row[header])}`}>
                    {row[header]}
                  </span>
                ) : (
                  row[header]
                )}
              </td>

            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;