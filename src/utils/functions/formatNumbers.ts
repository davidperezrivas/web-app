export const formatNumber = (value: number): string => {
  const num = typeof value === 'number' ? value : parseFloat(value);
  return `${num.toLocaleString('es-CL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

export const formatTotal = (value: number): string => {
  return `$ ${value.toLocaleString('es-CL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};
