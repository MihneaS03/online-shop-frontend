import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./product-details.scss";
import { useContext, useEffect } from "react";
import { ShoppingCartContext } from "../../context/shopping-cart.context";
import { Product } from "../../interfaces/products/product.interface";
import { CartItem } from "../../interfaces/cart/cart.interface";
import { useFetchProduct } from "../../hooks/useFetchProduct";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";

export default function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { product: productState } = location.state || {};
  const navigate = useNavigate();

  const { product, error, loading, fetchProduct, setProductFromState } =
    useFetchProduct();

  const { deleteError, deleteLoading, deleteProduct } = useDeleteProduct();

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

  const { addItemToCart } = useContext(ShoppingCartContext);

  return (
    <>
      {loading && <h1>Loading product...</h1>}
      {error && <h1>{error}</h1>}

      {deleteLoading && <h1>Deleting product...</h1>}
      {deleteError && <h1>{deleteError}</h1>}

      {!product ? (
        <h1>The product could not be found</h1>
      ) : (
        <div>
          <div className="header">
            <div className="heading">
              <h1>Product: {product.name}</h1>
            </div>
            <div className="buttons">
              <button onClick={() => handleAddToCart(product)}>
                Add to cart
              </button>
              <button className="edit-btn">EDIT</button>
              <button className="delete-btn" onClick={() => handleDelete()}>
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
