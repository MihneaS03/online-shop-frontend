import { Link } from "react-router-dom";
import './product-list-item.scss'
import { Product } from "../../../interfaces/products/product.interface";

interface ProductProps {
  product: Product;
}

export default function ProductListItem({product}: ProductProps) {
  return (
    <>
      <tr>
            <td>{product.category}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td className= "detail-link-col"><Link to={`/products/${product.id}`}><button className="detail-page-btn">{">"}</button></Link></td>
      </tr>
    </>
  );
}