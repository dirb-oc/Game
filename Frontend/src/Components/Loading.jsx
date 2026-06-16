import "./Loading.css";

export default function Loading({ text = "Cargando..." }) {
    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>{text}</p>
        </div>
    );
}