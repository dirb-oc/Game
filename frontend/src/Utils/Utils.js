export const Selector_Styles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: '#1e2837',
    borderColor: '#4B5563',
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
    backgroundColor: '#1F2937', // bg-gray-800
    borderRadius: '8px',
    marginTop: '4px',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#374151' : '#1F2937',
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
    backgroundColor: '#374151',
    borderColor: '#4B5563',
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

export function convertirHorasADiasYHoras(horasTotales) {
  const dias = Math.floor(horasTotales / 24);
  const horas = Math.floor(horasTotales % 24);

  let resultado = "";

  if (dias > 0) {
    resultado += `${dias} ${dias === 1 ? "día" : "días"}`;
  }

  if (horas > 0) {
    if (dias > 0) resultado += " y ";
    resultado += `${horas} ${horas === 1 ? "hora" : "horas"}`;
  }

  return resultado || "Pendiente";
}

export function formatoMoneda(valor) {
  return Number(valor).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });
}