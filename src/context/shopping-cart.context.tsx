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
    const updatedCartItems: CartItem[] = [...shoppingCartItems];
    const tempCartItem = updatedCartItems.find(
      (item) => cartItem.id === item.id
    );

    if (tempCartItem) {
      tempCartItem.quantity++;
    } else {
      updatedCartItems.push({
        ...cartItem,
        quantity: 1,
      });
    }

    setShoppingCartItems(updatedCartItems);
  };

  const deleteItemFromCart = (id: string) => {
    let updatedCartItems: CartItem[] = [...shoppingCartItems];
    const tempCartItem = updatedCartItems.find((item) => id === item.id);

    if (tempCartItem) {
      if (tempCartItem.quantity > 1) {
        tempCartItem.quantity--;
      } else {
        updatedCartItems = updatedCartItems.filter((item) => id !== item.id);
      }
      setShoppingCartItems(updatedCartItems);
    }
  };

  return (
    <ShoppingCartContext.Provider
      value={{ shoppingCartItems, addItemToCart, deleteItemFromCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
