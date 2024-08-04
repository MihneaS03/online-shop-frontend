import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./product-details.scss";
import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../../context/shopping-cart.context";
import { Product } from "../../interfaces/products/product.interface";
import { CartItem } from "../../interfaces/cart/cart.interface";
import { useAuth } from "../../hooks/auth/useAuth";
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
} from "../../services/products/product.api";

export default function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { product: productState } = location.state || {};

  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(productState || null);

  const { data, isLoading, error } = useGetProductByIdQuery(id!, {
    skip: productState,
  });

  const [deleteProduct] = useDeleteProductMutation();

  const { addItemToCart } = useContext(ShoppingCartContext);
  const auth = useAuth();

  useEffect(() => {
    if (!productState && data) {
      setProduct(data);
    }
  }, [productState, data]);

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

  const isAdmin = auth.user?.role == "admin";
  const isCustomer = auth.user?.role == "customer";

  return (
    <>
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
      ) : product ? (
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
      ) : (
        <h1>The product could not be found</h1>
      )}
    </>
  );
}
