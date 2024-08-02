import { Link } from "react-router-dom";
import ProductListItem from "../../components/product-list/product-list-item/product-list-item";
import "./product-list.scss";
import { useFetchProducts } from "../../hooks/products/useFetchProducts";
import { useAuth } from "../../hooks/auth/useAuth";

export default function ProductList() {
  const { products, error, loading } = useFetchProducts();
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

        {loading && <div>Loading products...</div>}
        {error ? (
          <div>{error}</div>
        ) : (
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
        )}
      </div>
    </>
  );
}
