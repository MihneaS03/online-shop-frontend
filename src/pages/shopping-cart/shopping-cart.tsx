import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartContext } from "../../context/shopping-cart.context";
import ShoppingCartItem from "../../components/shopping-cart/shopping-cart-item/shopping-cart-item";
import { CartItem } from "../../interfaces/cart/cart.interface";
import {
  OrderProduct,
  CreateOrderDTO,
} from "../../interfaces/orders/order.interface";
import "./shopping-cart.scss";
import { useAuth } from "../../hooks/auth/useAuth";
import { useCreateOrderMutation } from "../../services/orders/order.api";

export default function ShoppingCart() {
  const navigate = useNavigate();
  const { shoppingCartItems } = useContext(ShoppingCartContext);
  const auth = useAuth();

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handleCheckout = async () => {
    const mockOrderData: CreateOrderDTO = {
      customer: "8d9a507a-c093-45a2-8613-2a2f980389fb",
      addressCountry: "USA",
      addressCity: "Los Angeles",
      addressCounty: "California",
      addressStreet: "Street5",
      orderProducts: shoppingCartItems.map((item) => {
        return {
          product: item.id,
          shippedFrom: "9e8fdec8-ab0a-4355-bcb5-47b8f19cd5b7",
          quantity: item.quantity,
        } as OrderProduct;
      }),
    };
    try {
      await createOrder(mockOrderData);
      navigate("/products");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {auth.user?.role !== "customer" ? (
        <h1>Access denied</h1>
      ) : (
        <div className="shopping-cart">
          <div className="header">
            <div className="heading">
              <h1>Shopping Cart</h1>
            </div>

            <div className="buttons">
              <Link to="/checkout">
                <button onClick={handleCheckout}>CHECKOUT</button>
              </Link>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {shoppingCartItems.map((item: CartItem) => (
                <ShoppingCartItem key={item.id} item={item} />
              ))}
            </tbody>
          </table>

          {isLoading && <h1>Processing Order...</h1>}
        </div>
      )}
    </>
  );
}
