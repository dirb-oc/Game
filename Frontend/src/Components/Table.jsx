import "./Table.css";
import { useEffect, useState } from "react";

const Table = ({ data, onRowClick, columns }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!data || data.length === 0) {
        return <p className="Not_Found">No hay datos</p>;
    }

    const CamposOcultos = ["id"];

    const headers = columns ? columns : Object.keys(data[0]).filter((key) => !CamposOcultos.includes(key));

    const getDescuentoClass = (valor) => {
        if (valor === "-" || isNaN(parseInt(valor))) return "descuento-nulo";

        const num = parseInt(valor.replace("%", ""));
        if (num > 50) return "descuento-alto";
        if (num >= 25) return "descuento-medio";
        return "descuento-bajo";
    };

    if (isMobile) {
        return (
            <div className="table-cards">
                {data.map((row, i) => (
                    <div
                        key={i}
                        className="table-card"
                        onClick={() => onRowClick?.(row)}
                    >
                        {headers.map((header, idx) => (
                            <div className="card-row" key={idx}>
                                <span className="card-label">
                                    {header.replace(/_/g, " ")}
                                </span>

                                <span className="card-value">
                                    {header === "descuento" ? (
                                        <span className={`descuento-tag ${getDescuentoClass(row[header])}`}>
                                            {row[header]}
                                        </span>
                                    ) : (
                                        row[header]
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }

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
                    <tr
                        key={rowIndex}
                        className="table-row-animate"
                        style={{ animationDelay: `${rowIndex * 30}ms`, cursor: onRowClick ? "pointer" : "default" }}
                        onClick={() => onRowClick?.(row)}
                    >
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