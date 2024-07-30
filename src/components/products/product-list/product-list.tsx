import { Link } from 'react-router-dom';
import ProductListItem from '../product-list-item/product-list-item';
import './product-list.scss'
import { Product } from '../../../interfaces/products/product.interface';
import { useEffect, useState } from 'react';
import productService from '../../../services/products/product.service';

export default function ProductList() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchAllProducts = async () => {
      try {
        const allProducts = await productService.getAll(controller.signal);
        setProducts(allProducts);
        setError(null); 
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occured');
        }
        setProducts(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();

    return () => controller.abort();

}, [])

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
      
      {loading && <div>Loading products...</div> }
      {error ? <div>{error}</div> :
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
          {products && products.map((product) => 
            <ProductListItem key={product.id} product={product}/>
          )}
          </tbody>
        </table>
      }
    </>
  )
}