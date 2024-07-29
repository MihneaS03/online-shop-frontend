import { CartItem } from "../../../interfaces/cart/cart.interface";


interface ShoppingCartItemProps {
  item: CartItem;
}

export default function ShoppingCartItem({ item }: ShoppingCartItemProps) {
  return (
    <>
      <tr>
            <td>{item.category}</td>
            <td>{item.productName}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
      </tr>
    </>
  )
}