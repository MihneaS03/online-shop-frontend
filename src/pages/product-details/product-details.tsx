import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./product-details.scss";
import { useContext, useEffect } from "react";
import { ShoppingCartContext } from "../../context/shopping-cart.context";
import { Product } from "../../interfaces/products/product.interface";
import { CartItem } from "../../interfaces/cart/cart.interface";
import { useFetchProduct } from "../../hooks/products/useFetchProduct";
import { useDeleteProduct } from "../../hooks/products/useDeleteProduct";
import { useAuth } from "../../hooks/auth/useAuth";

export default function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { product: productState } = location.state || {};
  const navigate = useNavigate();

  const { product, error, loading, fetchProduct, setProductFromState } =
    useFetchProduct();

  const { deleteError, deleteLoading, deleteProduct } = useDeleteProduct();

  const { addItemToCart } = useContext(ShoppingCartContext);
  const auth = useAuth();
  const isAdmin = auth.user?.role == "admin";
  const isCustomer = auth.user?.role == "customer";

  useEffect(() => {
    const controller = new AbortController();
    if (productState) {
      setProductFromState(productState);
    } else {
      if (id) {
        fetchProduct(id, controller.signal);
      }
    }
    return () => controller.abort();
  }, [id, productState, fetchProduct, setProductFromState]);

  const handleAddToCart = (product: Product) => {
    const item: CartItem = {
      id: product.id,
      category: product.category.name,
      productName: product.name,
      price: product.price,
      quantity: 1,
    };
    addItemToCart(item);
  };

  const handleDelete = async () => {
    if (id) {
      await deleteProduct(id);
    }
    navigate("/products");
  };

  return (
    <>
      {loading && <h1>Loading product...</h1>}
      {error && <h1>{error}</h1>}

      {deleteLoading && <h1>Deleting product...</h1>}
      {deleteError && <h1>{deleteError}</h1>}

      {!product ? (
        <h1>The product could not be found</h1>
      ) : (
        <div className="">
          <div className="header">
            <div className="heading">
              <h1>Product: {product.name}</h1>
            </div>
            <div className="buttons">
              <button
                onClick={() => handleAddToCart(product)}
                disabled={!isCustomer}
              >
                Add to cart
              </button>
              <Link to={`/products/edit/${id}`} state={product}>
                <button className="edit-btn" disabled={!isAdmin}>
                  EDIT
                </button>
              </Link>
              <button
                className="delete-btn"
                onClick={() => handleDelete()}
                disabled={!isAdmin}
              >
                DELETE
              </button>
            </div>
          </div>

          <div className="product-info">
            <div className="product-details">
              <p className="tag">Name</p>
              <p>{product.name}</p>
              <p className="tag">Category</p>
              <p>{product.category.name}</p>
              <p className="tag">Price</p>
              <p>{product.price}</p>
              <p className="tag">Description</p>
              <p>{product.description}</p>
            </div>
            <div className="product-image">
              <img src={product.imageUrl} alt={product.name} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
