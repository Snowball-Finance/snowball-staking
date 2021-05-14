
export const formatPercent = (decimal = 0) => {
  return (decimal * 100).toFixed(2);
};

export const formatAPY = (apy) => {
  if (apy === Number.POSITIVE_INFINITY) return "∞%";
  return apy.toFixed(2) + "%";
};