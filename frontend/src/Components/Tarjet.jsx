import "./Tarjet.css"

const Target = ({title, icon, color, Value, Subvalue}) => {
    return(
        <div className="Tarjet">
            <div className="Tarjet_Head">
                <p>{title}</p>
                <span className={`T_Icon ${color}`}>{icon}</span>
            </div>
            <div className="Tarjet_Content">
                <p className="Value">{Value}</p>
                <p className="SubValue">{Subvalue}</p>
            </div>
        </div>
    );
};

export default Target;