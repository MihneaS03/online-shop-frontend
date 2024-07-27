import { ShoppingCartProduct } from "../../context/shopping-cart.context";

type ShoppingCartItemProps = {
  item: ShoppingCartProduct;
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