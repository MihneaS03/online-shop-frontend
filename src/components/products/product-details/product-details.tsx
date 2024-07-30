import { useParams } from "react-router-dom";
import './product-details.scss'
import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../../../context/shopping-cart.context";
import { Product } from "../../../interfaces/products/product.interface";
import productService from "../../../services/products/product.service";

export default function ProductDetails() {
  const {id} = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // const product: Product | undefined = productsList.find(p => p.id === id);

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
          setError('An unknown error occured');
        }
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();

    return () => controller.abort();

  }, [id]);

  const {addItemToCart} = useContext(ShoppingCartContext);

  return (
    <>
      {loading && <div>Loading products...</div> }
      {error && <div>{error}</div>}
      
      {!product ? <h1>The product could not be found</h1> :
      <div>
        <div className="header">
          <div className="heading">
            <h1>Product: {product.name}</h1>
          </div>
          <div className="buttons">
            <button onClick={() => addItemToCart({id: product.id, category: product.category.name, productName: product.name, price: product.price, quantity: 1}) }>Add to cart</button>
            <button className="edit-btn">EDIT</button>
            <button className="delete-btn">DELETE</button>
          </div>
        </div>

        <div className="product-info">
          <div className="product-details">
            <p className="tag">Name</p><p>{product.name}</p>
            <p className="tag">Category</p><p>{product.category.name}</p>
            <p className="tag">Price</p><p>{product.price}</p>
            <p className="tag">Description</p><p>{product.description}</p>
            </div>
            <div className="product-image"><img src={product.imageUrl} alt={product.name} /></div>
        </div>
      </div>
      }
    </>
  )
}