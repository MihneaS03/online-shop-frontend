import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./product-details.scss";
import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../../context/shopping-cart.context";
import { Product } from "../../interfaces/products/product.interface";
import { productService } from "../../services/products/product.service";
import { CartItem } from "../../interfaces/cart/cart.interface";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const { product: productState } = location.state || {};

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        const product = await productService.getById(id!, controller.signal);
        setProduct(product);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occured");
        }
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (!productState) {
      fetchProduct();
    } else {
      setProduct(productState);
      setError(null);
      setLoading(false);
    }

    return () => controller.abort();
  }, [id, productState]);

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

  const handleDelete = async (id: string) => {
    try {
      await productService.delete(id);
      navigate("/products");
    } catch (err) {
      console.error(err);
    }
  };

  const { addItemToCart } = useContext(ShoppingCartContext);

  return (
    <>
      {loading && <div>Loading products...</div>}
      {error && <div>{error}</div>}

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
              <button
                className="delete-btn"
                onClick={() => handleDelete(product.id)}
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
