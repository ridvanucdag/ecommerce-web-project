export const formatPrice = (price: number) => {
  const formattedPrice = price.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `$${formattedPrice}`;
};