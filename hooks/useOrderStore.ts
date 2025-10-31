import { useState } from 'react';
import { CustomerInfo, DesignInfo, ProductInfo, OrderPricing } from '@/types/order';

interface OrderStore {
  customerInfo: CustomerInfo | null;
  designInfo: DesignInfo | null;
  productInfo: ProductInfo | null;
  pricing: OrderPricing | null;
  setCustomerInfo: (info: CustomerInfo) => void;
  setDesignInfo: (info: DesignInfo) => void;
  setProductInfo: (info: ProductInfo) => void;
  setPricing: (pricing: OrderPricing) => void;
  clearOrder: () => void;
}

export function useOrderStore(): OrderStore {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [designInfo, setDesignInfo] = useState<DesignInfo | null>(null);
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const [pricing, setPricing] = useState<OrderPricing | null>(null);

  const clearOrder = () => {
    setCustomerInfo(null);
    setDesignInfo(null);
    setProductInfo(null);
    setPricing(null);
  };

  return {
    customerInfo,
    designInfo,
    productInfo,
    pricing,
    setCustomerInfo,
    setDesignInfo,
    setProductInfo,
    setPricing,
    clearOrder,
  };
}