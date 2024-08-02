import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { CartItem } from "../interfaces/cart/cart.interface";

interface IShoppingCartContext {
  shoppingCartItems: CartItem[];
  addItemToCart: (item: CartItem) => void;
  deleteItemFromCart: (id: string) => void;
}

interface ShoppingCartProviderProps {
  children: ReactNode;
}

export const ShoppingCartContext = createContext<IShoppingCartContext>(
  {} as IShoppingCartContext
);

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [shoppingCartItems, setShoppingCartItems] = useState<CartItem[]>([]);

  const addItemToCart = useCallback(
    (cartItem: CartItem) => {
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
    },
    [shoppingCartItems]
  );

  const deleteItemFromCart = useCallback(
    (id: string) => {
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
    },
    [shoppingCartItems]
  );

  const value = useMemo(
    () => ({ shoppingCartItems, addItemToCart, deleteItemFromCart }),
    [shoppingCartItems, addItemToCart, deleteItemFromCart]
  );

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
