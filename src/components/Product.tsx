import { ProductDetails } from "../data/products";

type ProductProps = {
  product: ProductDetails;
};

export default function Product({product}: ProductProps) {
  return (
    <>
      <tr>
            <td>{product.category}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td><a href="">Details</a></td>
      </tr>
    </>
  );
}