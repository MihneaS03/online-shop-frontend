import { useParams } from "react-router-dom";
import { ProductObject, productsList } from "../../data/products";
import './product-details.scss'
import { useContext } from "react";
import { ShoppingCartAddContext, ShoppingCartProduct } from "../../context/shopping-cart.context";

export default function ProductDetails() {
  const {id} = useParams();
  const product: ProductObject | undefined = productsList.find(p => p.id === id);

  const addProductToShoppingCart: (item: ShoppingCartProduct) => void = useContext(ShoppingCartAddContext)

  return (
    <>
      {product === undefined ? <h1>The product could not be found</h1> :
      <div>
        <div className="header">
          <div className="heading">
            <h1>Product: {product.name}</h1>
          </div>
          <div className="buttons">
            <button onClick={() => addProductToShoppingCart({id: product.id, category: product.category, productName: product.name, price: product.price, quantity: 1}) }>Add to cart</button>
            <button className="edit-btn">EDIT</button>
            <button className="delete-btn">DELETE</button>
          </div>
        </div>

        <div className="product-info">
          <div className="product-details">
            <p className="tag">Name</p><p>{product.name}</p>
            <p className="tag">Category</p><p>{product.category}</p>
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