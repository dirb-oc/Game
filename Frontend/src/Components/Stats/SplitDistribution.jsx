import "./SplitDistribution.css";

function formatValue(value, prefix = "", suffix = "") {
    if (prefix === "$") { return `${prefix}${Number(value).toLocaleString("es-CO")}`; }

    return `${value}${suffix}`;
}

export default function SplitDistribution({ title, data }) {
    const total = data.reduce((acc, item) => acc + item.value, 0);

    return (
        <div className="stack-card">

            <h3 className="stack-title">{title}</h3>

            <div className="stack-bar">

                {data.map((item, index) => {

                    const percentage =
                        (item.value / total) * 100;

                    return (
                        <div key={index} className="stack-segment" style={{
                            width: `${percentage}%`,
                            background: item.color
                        }}
                            title={`${item.name}
${formatValue(item.value, item.prefix, item.suffix)}
${percentage.toFixed(1)}%`}
                        />
                    );

                })}

            </div>

            <div className="stack-footer">

                {data.map((item, index) => {

                    const percentage = ((item.value / total) * 100).toFixed(1);

                    return (
                        <div key={index} className="stack-item" >

                            <div className="stack-label">
                                <span className="dot" style={{ background: item.color }} />
                                <span>{item.name}</span>
                            </div>

                            <div className="stack-value">
                                <h4>{formatValue(item.value, item.prefix, item.suffix)}</h4>
                                <span>{percentage}%</span>
                            </div>

                        </div>
                    );

                })}

            </div>

        </div>
    );
}