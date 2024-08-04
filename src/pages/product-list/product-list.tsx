import { Link } from "react-router-dom";
import ProductListItem from "../../components/product-list/product-list-item/product-list-item";
import "./product-list.scss";
import { useAuth } from "../../hooks/auth/useAuth";
import { useGetAllProductsQuery } from "../../services/products/product.api";

export default function ProductList() {
  const { data: products, isLoading, error } = useGetAllProductsQuery();
  const auth = useAuth();
  const isAdmin = auth.user?.role == "admin";

  return (
    <>
      <div className="product-list">
        <div className="header">
          <div className="heading">
            <h1>Products</h1>
          </div>

          <div className="buttons">
            <Link to="/shopping-cart">
              <button>See Cart</button>
            </Link>
            <Link to="/products/add">
              <button disabled={!isAdmin}>ADD</button>
            </Link>
          </div>
        </div>

        {error ? (
          <div>
            {error instanceof Error ? (
              error.message
            ) : (
              <div>An error has occured</div>
            )}
          </div>
        ) : isLoading ? (
          <div>Loading products...</div>
        ) : products ? (
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Product Name</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <ProductListItem key={product.id} product={product} />
                ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </>
  );
}
