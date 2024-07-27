import { Link } from "react-router-dom";
import { ProductObject } from "../../data/products";
import './product-list-item.scss'

type ProductProps = {
  product: ProductObject;
};

export default function ProductListItem({product}: ProductProps) {
  return (
    <>
      <tr>
            <td>{product.category}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td className="detail-link-col"><Link to={`/products/${product.id}`}><button className="detail-page-btn">{">"}</button></Link></td>
      </tr>
    </>
  );
}