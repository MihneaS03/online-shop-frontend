import { ProductDetails, productsList } from '../data/products'
import  Product  from '../components/Product';
import '../styles/ProductsList.scss'

export default function ProductsList() {
  const products: ProductDetails[] = productsList;
  return (
    <>
      <div className='header'>
        <div className='heading'>
          <h1>Products</h1>
        </div>
      
        <div className='buttons'>
          <button>See Cart</button>
          <button>ADD</button>
        </div>
      </div>   
      
      <table>
        <tr>
          <th>Category</th>
          <th>Product Name</th>
          <th>Price</th>
          <th></th>
        </tr>
        {products.map((product) => 
          <Product key={product.id} product={product}/>
        )}
      </table>
    </>
  )
}