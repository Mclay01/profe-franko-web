export interface Order {
  id: string;
  customerInfo: CustomerInfo;
  designInfo: DesignInfo;
  productInfo: ProductInfo;
  pricing: OrderPricing;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  commune: string;
  region: string;
}

export interface DesignInfo {
  type: 'upload' | 'template' | 'ai';
  imageUrl?: string;
  templateId?: number;
  description?: string;
  removeBackground: boolean;
}

export interface ProductInfo {
  size: string;
  color: { name: string; color: string };
  quantity: number;
}

export interface OrderPricing {
  basePrice: number;
  designPrice: number;
  removeBackgroundPrice: number;
  total: number;
}

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered';