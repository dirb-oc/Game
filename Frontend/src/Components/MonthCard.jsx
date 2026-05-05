import "./MonthCard.css"
import Select from "react-select";
import { MdAccessTime } from "react-icons/md";
import { GoTrophy } from "react-icons/go";

export default function MonthCard({ data, meses, mes, onChangeMes }) {

    const monthTitleStyles = {
        container: (base) => ({
            ...base,
            width: "fit-content",
            marginTop: "30px",
            marginBottom: "20px",
        }),
        control: (base) => ({
            ...base,
            background: "transparent",
            border: "none",
            boxShadow: "none",
            cursor: "pointer",
            minHeight: "auto"
        }),

        singleValue: (base) => ({
            ...base,
            color: "#fff",
            fontSize: "1.6rem",
            fontWeight: 700,
            letterSpacing: ".5px"
        }),

        placeholder: (base) => ({
            ...base,
            color: "#fff",
            fontSize: "1.6rem",
            fontWeight: 700
        }),

        dropdownIndicator: (base) => ({
            ...base,
            color: "#fff",
            paddingLeft: 6,
            transition: "transform .2s ease"
        }),

        indicatorSeparator: () => ({
            display: "none"
        }),

        menu: (base) => ({
            ...base,
            backgroundColor: "#111",
            borderRadius: 12,
            overflow: "hidden",
            width: 200
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? "rgba(255,255,255,.15)"      // 👈 seleccionado
                : state.isFocused
                    ? "rgba(255,255,255,.08)"      // hover
                    : "transparent",
            color: "#fff",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: state.isSelected ? 600 : 400,
            whiteSpace: "nowrap"
        })
    };

    const MONTH_NAMES = [
        "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const options = meses.map(m => ({
        value: m.month,
        label: MONTH_NAMES[m.month]
    }));

    const selectedOption = mes ? {
        value: mes.month,
        label: MONTH_NAMES[mes.month]
    } : null;

    const topGame = data.games && data.games.length > 0 ?
        data.games.reduce((max, g) => (g.horas > max.horas ? g : max)) : null;

    return (
        <div
            className="MonthCard"
            style={{
                backgroundImage: topGame
                    ? `linear-gradient(rgba(0,0,0,.75), rgba(0,0,0,1)), url(${topGame.imagen})`
                    : "none",
            }}
        >
            <Select
                options={options}
                value={selectedOption}
                placeholder="Selecciona un mes"
                onChange={(option) => {
                    const nuevoMes = meses.find(m => m.month === option.value);
                    onChangeMes(nuevoMes);
                }}
                styles={monthTitleStyles}
            />
            <div className="Info_Month">
                <div className="Info_M">
                    <p className="Value">{data.horas}</p>
                    <p className="Name">Horas</p>
                </div>
                <div className="Info_M">
                    <p className="Value">{data.logros}</p>
                    <p className="Name">Logros</p>
                </div>
                <div className="Info_M">
                    <p className="Value">{data.games?.length ?? 0}</p>
                    <p className="Name">Juegos</p>
                </div>
            </div>
            <div className="dividerMonth" />
            <div className="Games-Container">
                {data.games?.map(game => (
                    <div key={game.id} className="game-card">
                        <div className="game-image">
                            <img src={game.imagen} alt={game.nombre} />
                        </div>
                        <div className="game-info">
                            <h4 className="game-title">{game.nombre}</h4>
                            <div className="game-stats">
                                <span className="stat-item">
                                    <MdAccessTime className="icon time-icon" />
                                    {game.horas} h
                                </span>

                                {game.logros > 0 && (
                                    <span className="stat-item achievement">
                                        <GoTrophy className="icon trophy-icon" />
                                        {game.logros}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
