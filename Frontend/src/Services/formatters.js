export const formatPrice = (price) => {
    const value = Number(price);

    if (value === 0) return "Gratis";

    return `$${value.toLocaleString("es-CO")}`;
};

export const handleFormattedPriceChange = (
    e,
    setForm
) => {

    const raw = e.target.value.replace(/\D/g, "");

    const formatted = Number(raw).toLocaleString(
        "es-CO",
        {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        }
    );

    setForm(prev => ({
        ...prev,
        precioFormatted: formatted,
        precio: raw
    }));
};