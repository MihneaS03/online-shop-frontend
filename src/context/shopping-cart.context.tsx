import { createContext, ReactNode, useState } from "react";
import { CartItem } from "../interfaces/cart/cart.interface";

interface ShoppingCartContextType {
  shoppingCartItems: CartItem[];
  addItemToCart: (item: CartItem) => void;
  deleteItemFromCart: (id: string) => void;
}

interface ShoppingCartProviderProps {
  children: ReactNode;
}

export const ShoppingCartContext = createContext<ShoppingCartContextType>(
  {} as ShoppingCartContextType
);

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [shoppingCartItems, setShoppingCartItems] = useState<CartItem[]>([]);

  const addItemToCart = (cartItem: CartItem) => {
    const itemExistsInTheCart: boolean =
      shoppingCartItems.find((item) => cartItem.id === item.id) !== undefined;

    if (itemExistsInTheCart) {
      setShoppingCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setShoppingCartItems((prevItems) => [
        ...prevItems,
        { ...cartItem, quantity: 1 },
      ]);
    }
  };

  const deleteItemFromCart = (id: string) => {
    setShoppingCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  return (
    <ShoppingCartContext.Provider
      value={{ shoppingCartItems, addItemToCart, deleteItemFromCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
