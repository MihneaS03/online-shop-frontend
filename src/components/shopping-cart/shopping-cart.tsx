import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartContext, ShoppingCartProduct } from "../../context/shopping-cart.context";
import ShoppingCartItem from "../shopping-cart-item/shopping-cart-item";

export default function ShoppingCart() {
  const cartItems = useContext(ShoppingCartContext);

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
        {cartItems.map((item: ShoppingCartProduct) => 
          <ShoppingCartItem key={item.id} item={item}/>
        )}
      </table> 
    </>
  )
}