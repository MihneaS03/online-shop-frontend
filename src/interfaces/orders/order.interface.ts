export interface Order {
  customer: string;
  addressCountry: string;
  addressCity: string;
  addressCounty: string;
  addressStreet: string;
  createdAt: Date;
}

export interface OrderProduct {
  product: string;
  shippedFrom: string;
  quantity: number;
}

export interface CreateOrderDTO {
  customer: string;
  addressCountry: string;
  addressCity: string;
  addressCounty: string;
  addressStreet: string;
  orderProducts: OrderProduct[];
}
