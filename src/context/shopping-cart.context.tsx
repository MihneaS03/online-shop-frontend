import { createContext, ReactNode, useState } from "react";

export type ShoppingCartProduct = {
  id: string;
  category: string;
  productName: string;
  price: number;
  quantity: number;
}

type ShoppingCartProviderProps = {
  children: ReactNode;
}

export const ShoppingCartContext = createContext<ShoppingCartProduct[]>([]);
export const ShoppingCartAddContext = createContext<(item: ShoppingCartProduct) => void>(() => {});
export const ShoppingCartDeleteContext = createContext<(id: string) => void>(() => {});

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [shoppingCartItems, setShoppingCartItems] = useState<ShoppingCartProduct[]>([]);

  function addItemToCart(item: ShoppingCartProduct) {
    const itemExistsInTheCart: boolean = shoppingCartItems.find(i => i.id === item.id) !== undefined ? true: false;
    if (itemExistsInTheCart) {
      setShoppingCartItems((prevItems) => prevItems.map((i) => i.id === item.id ? {...i, quantity: i.quantity + 1} : i))
    } else {
      setShoppingCartItems((prevItems) => [...prevItems, {...item, quantity: 1}]);
    }
  }

  function deleteItemFromCart(id: string) {
    setShoppingCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  }

  return (
    <ShoppingCartContext.Provider value={shoppingCartItems}>
    <ShoppingCartAddContext.Provider value={addItemToCart}>
    <ShoppingCartDeleteContext.Provider value={deleteItemFromCart}>
    {children}
    </ShoppingCartDeleteContext.Provider>
    </ShoppingCartAddContext.Provider>
    </ShoppingCartContext.Provider>
  )
}

