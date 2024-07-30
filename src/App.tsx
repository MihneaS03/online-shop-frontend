import "./App.scss";
import ProductDetails from "./components/products/product-details/product-details";
import ProductList from "./components/products/product-list/product-list";
import { Navigate, Route, Routes } from "react-router-dom";
import ShoppingCart from "./components/cart/shopping-cart/shopping-cart";
import EditProductForm from "./components/products/edit-product-form/edit-product-form";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products">
          <Route index element={<ProductList />} />
          <Route path="edit/:id" element={<EditProductForm />} />
          <Route path=":id" element={<ProductDetails />} />
        </Route>
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="*" element={<Navigate to="/products" />} />
      </Routes>
    </>
  );
}

export default App;
