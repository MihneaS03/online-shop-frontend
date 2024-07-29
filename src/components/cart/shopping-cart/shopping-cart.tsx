import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartContext } from "../../../context/shopping-cart.context";
import ShoppingCartItem from "../shopping-cart-item/shopping-cart-item";
import { CartItem } from "../../../interfaces/cart/cart.interface";

export default function ShoppingCart() {
  const {shoppingCartItems} = useContext(ShoppingCartContext);

  return (
    <>
      <div className='header'>
        <div className='heading'>
          <h1>Shopping Cart</h1>
        </div>
      
        <div className='buttons'>
          <Link to='/checkout'><button>CHECKOUT</button></Link>
        </div>
      </div>  

      <table>
        <tr>
          <th>Category</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th></th>
        </tr>
        {shoppingCartItems.map((item: CartItem) => 
          <ShoppingCartItem key={item.id} item={item}/>
        )}
      </table> 
    </>
  )
}