export const Multi_Styles = {
    control: (base, state) => ({
        ...base,

        backgroundColor: "#080d16",
        borderColor: state.isFocused
            ? "#2563eb"
            : "#1f2937",

        minHeight: "40px",

        boxShadow: "none",

        "&:hover": {
            borderColor: "#2563eb"
        }
    }),

    menu: (base) => ({
        ...base,

        backgroundColor: "#080d16",
        border: "1px solid #1f2937",

        overflow: "hidden"
    }),

    option: (base, state) => ({
        ...base,

        backgroundColor: state.isSelected
            ? "#2563eb"
            : state.isFocused
                ? "#111827"
                : "#080d16",

        color: "#ffffff",

        fontSize: "0.85rem",

        cursor: "pointer"
    }),

    multiValue: (base) => ({
        ...base,

        backgroundColor: "#2563eb",

        border: "1px solid #2563eb"
    }),

    multiValueLabel: (base) => ({
        ...base,

        color: "#ffffff",

        fontSize: "0.8rem"
    }),

    multiValueRemove: (base) => ({
        ...base,

        color: "#ffffff",

        ":hover": {
            backgroundColor: "#2563eb",
            color: "#ffffff"
        }
    }),

    placeholder: (base) => ({
        ...base,

        color: "#6b7280",

        fontSize: "0.85rem"
    }),

    input: (base) => ({
        ...base,

        color: "#ffffff",

        fontSize: "0.85rem"
    }),

    singleValue: (base) => ({
        ...base,

        color: "#ffffff",

        fontSize: "0.85rem"
    }),

    valueContainer: (base) => ({
        ...base,

        padding: "2px 8px"
    }),

    indicatorsContainer: (base) => ({
        ...base,

        color: "#9ca3af"
    }),

    dropdownIndicator: (base) => ({
        ...base,

        color: "#9ca3af",

        ":hover": {
            color: "#2563eb"
        }
    }),

    clearIndicator: (base) => ({
        ...base,

        color: "#9ca3af",

        ":hover": {
            color: "#ef4444"
        }
    }),
    menuList: (base) => ({
        ...base,
        maxHeight: '200px',
        overflowY: 'auto',

        scrollbarWidth: 'thin',
        scrollbarColor: '#3f3f46 #0c0c14',

        '::-webkit-scrollbar': {
            width: '8px',
        },
        '::-webkit-scrollbar-track': {
            background: '#0c0c14',
        },
        '::-webkit-scrollbar-thumb': {
            background: '#3f3f46',
            borderRadius: '4px',
        },

        /* 🔥 quita las flechas */
        '::-webkit-scrollbar-button': {
            display: 'none',
        },
    }),
};