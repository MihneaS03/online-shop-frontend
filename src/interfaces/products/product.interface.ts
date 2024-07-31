export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  supplier: string;
  imageUrl: string;
  category: ProductCategory;
}

export interface ProductCategory {
  name: string;
  description: string;
}