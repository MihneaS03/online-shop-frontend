export interface ProductDetails {
  id: string;
  name:string;
  description: string;
  price: number;
  weight: number;
  supplier: string;
  imageUrl: string;
  category: string;
}


export const productsList: ProductDetails[] = [
  {
    id: "1",
    name: "IPHONE 12",
    description: 'nice iphone',
    price: 500,
    weight: 0.3,
    supplier: "apple",
    imageUrl: "iphone12",
    category: "SMARTPHONES",
  },
  {
    id: "2",
    name: "IPHONE 13",
    description: 'nice iphone',
    price: 600,
    weight: 0.3,
    supplier: "apple",
    imageUrl: "iphone13",
    category: "SMARTPHONES",
  },
  {
    id: "3",
    name: "IPHONE 14",
    description: 'nice iphone',
    price: 700,
    weight: 0.4,
    supplier: "apple",
    imageUrl: "iphone14",
    category: "SMARTPHONES",
  },
  {
    id: "4",
    name: "IPHONE 15",
    description: 'nice iphone',
    price: 800,
    weight: 0.4,
    supplier: "apple",
    imageUrl: "iphone15",
    category: "SMARTPHONES",
  }
]