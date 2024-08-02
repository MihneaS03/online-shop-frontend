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
  id: string;
  name: string;
  description: string;
}

export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  weight: number;
  supplier: string;
  imageUrl: string;
  category: string;
}

export interface EditProductDTO {
  name: string;
  description: string;
  price: number;
  weight: number;
  supplier: string;
  imageUrl: string;
  category: string;
}