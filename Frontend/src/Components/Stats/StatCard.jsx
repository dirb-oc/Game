import "./StatCard.css";

function StatCard({ title, value, subtitle, icon, color }) {
    return (
        <article className="stat-card">
            <div className="stat-top">
                <span className="stat-title">{title}</span>
                <div className={`${color}`}>{icon}</div>
            </div>
            <h2 className="stat-value">{value}</h2>
            <p className="stat-subtitle">{subtitle}</p>
        </article>
    );
}

export default StatCard;