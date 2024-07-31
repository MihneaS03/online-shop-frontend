import "./App.scss";
import ProductDetails from "./pages/product-details/product-details";
import ProductList from "./pages/product-list/product-list";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import ShoppingCart from "./pages/shopping-cart/shopping-cart";
import NotFound from "./pages/not-found/not-found";
import EditProductForm from "./pages/edit-product-form/edit-product-form";
import AddProductForm from "./pages/add-product-form/add-product-form";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<Outlet />}>
          <Route index element={<ProductList />} />
          <Route path="edit/:id" element={<EditProductForm />} />
          <Route path="add" element={<AddProductForm />} />
          <Route path=":id" element={<ProductDetails />} />
        </Route>
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
