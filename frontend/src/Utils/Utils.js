export const Selector_Styles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: 'var(--Input)',
    borderColor: 'var(--bordes)',
    width: '220px',
    color: 'white',
    borderRadius: '8px',
    minHeight: '40px',
    boxShadow: state.isFocused ? '0 0 0 1px #93c5fd' : 'none',
    '&:hover': {
      borderColor: '#6B7280',
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: '#9CA3AF',
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#0f172a', // bg-gray-800
    borderRadius: '8px',
    marginTop: '4px',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#0f172a' : '#1F2937',
    color: '#9CA3AF',
    cursor: 'pointer',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: '#9CA3AF', // gris claro
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  input: (base) => ({
    ...base,
    color: '#9CA3AF',
  }),
};

export const Multi_Styles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: 'var(--Input)',
    borderColor: '#1a2233',
    width: '100%',
    color: 'white',
    borderRadius: '8px',
    minHeight: '50px',
    boxShadow: state.isFocused ? '0 0 0 1px #93c5fd' : 'none',
    '&:hover': {
      borderColor: '#6B7280',
    },
  }),

  singleValue: (base) => ({
    ...base,
    color: 'white',
  }),

  menu: (base) => ({
    ...base,
    backgroundColor: '#1F2937',
    borderRadius: '8px',
    marginTop: '4px',
  }),

  /* 👇 AQUÍ está el scroll */
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


  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#374151' : '#1F2937',
    color: 'white',
    cursor: 'pointer',
  }),

  dropdownIndicator: (base) => ({
    ...base,
    color: 'white',
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

  input: (base) => ({
    ...base,
    color: 'white',
  }),

  placeholder: (base) => ({
    ...base,
    color: 'white',
  }),

  multiValue: (base) => ({
    ...base,
    backgroundColor: '#2563EB',
    borderRadius: '6px',
    padding: '2px 6px',
    display: 'flex',
    alignItems: 'center',
    marginRight: '4px',
  }),

  multiValueLabel: (base) => ({
    ...base,
    color: 'white',
    fontWeight: '500',
    fontSize: '14px',
  }),

  multiValueRemove: (base) => ({
    ...base,
    color: 'white',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#1E40AF',
      color: 'white',
    },
  }),
};

export function formatoMoneda(valor) {
  return Number(valor).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });
}