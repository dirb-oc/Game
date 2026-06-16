import { FaClock, FaGamepad, FaTrophy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./YearsSection.css";

function YearCard({ year, hours, played, completed }) {
    const navigate = useNavigate();

    return (
        <article className="year-card" onClick={() => navigate(`/stats/${year}`)}>
            <h3 className="year-title">{year}</h3>
            <div className="year-stat hours"><FaClock /><span>{hours.toFixed(1)}h</span></div>
            <div className="year-stat played"><FaGamepad /><span>{played} jugados</span></div>
            <div className="year-stat completed"><FaTrophy /><span>{completed} terminados</span></div>
        </article>
    );
}

function YearsSection({ years }) {

    const avgPlayed = Math.round(years.reduce((acc, y) => acc + y.jugados, 0) / years.length);
    const avgCompleted = Math.round(years.reduce((acc, y) => acc + y.terminados, 0) / years.length);
    const avgHours = Math.round(years.reduce((acc, y) => acc + y.horas, 0) / years.length);

    return (
        <section className="years-section">

            <h2 className="years-title">Evolución Anual</h2>
            <div className="years-grid">

                {years.map((year) => (

                    <YearCard
                        key={year.year}
                        year={year.year}
                        hours={year.horas}
                        played={year.jugados}
                        completed={year.terminados}
                    />

                ))}

            </div>
            <div className="years-footer">

                <div className="year-average">
                    <strong className="hours">{avgHours}h</strong>
                    <span>Horas</span>
                </div>

                <div className="year-average">
                    <strong className="played">{avgPlayed}</strong>
                    <span>Jugados</span>
                </div>

                <div className="year-average">
                    <strong  className="completed">{avgCompleted}</strong>
                    <span>Terminados</span>
                </div>

                

            </div>

        </section>
    );
}

export default YearsSection;