import { Link } from 'react-router-dom';
import { productsList } from '../../../data/products'
import ProductListItem from '../product-list-item/product-list-item';
import './product-list.scss'
import { Product } from '../../../interfaces/products/product.interface';

export default function ProductList() {
  const products: Product[] = productsList;
  return (
    <>
      <div className='header'>
        <div className='heading'>
          <h1>Products</h1>
        </div>
      
        <div className='buttons'>
          <Link to='/shopping-cart'><button>See Cart</button></Link>
          <Link to='/products/add'><button>ADD</button></Link>
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
          <ProductListItem key={product.id} product={product}/>
        )}
      </table>
    </>
  )
}