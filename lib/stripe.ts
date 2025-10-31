'use client'

// Solo para que compile. Más adelante usarás WooCommerce + Stripe en WP.
export const pricingPlans = {};
export async function createCheckoutSession(_priceId: string, _userId?: string) {
  alert('Checkout manejado por WooCommerce. Esta landing es estática.');
}
export async function createPortalSession(_customerId: string) {
  alert('Portal de cliente no disponible en esta landing.');
}