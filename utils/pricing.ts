export const PRICING = {
  BASE_PRICE: 15000,
  DESIGN_PRICE: 2000,
  REMOVE_BACKGROUND_PRICE: 200,
  SHIPPING_PRICE: 0, // Envío gratis
};

export const calculateOrderTotal = (
  quantity: number,
  hasDesign: boolean,
  removeBackground: boolean,
  hasSubscription: boolean
): {
  basePrice: number;
  designPrice: number;
  removeBackgroundPrice: number;
  shippingPrice: number;
  total: number;
} => {
  const basePrice = PRICING.BASE_PRICE * quantity;
  const designPrice = hasDesign ? PRICING.DESIGN_PRICE * quantity : 0;
  const removeBackgroundPrice = removeBackground && !hasSubscription 
    ? PRICING.REMOVE_BACKGROUND_PRICE * quantity 
    : 0;
  const shippingPrice = PRICING.SHIPPING_PRICE;

  const total = basePrice + designPrice + removeBackgroundPrice + shippingPrice;

  return {
    basePrice,
    designPrice,
    removeBackgroundPrice,
    shippingPrice,
    total,
  };
};