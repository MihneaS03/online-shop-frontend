import { useEffect, useState } from "react";
import { productService } from "../services/products/product.service";
import { Product } from "../interfaces/products/product.interface";

export const useFetchProducts = () => {
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
          setError("An unknown error occured");
        }
        setProducts(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();

    return () => controller.abort();
  }, []);


  return {products, error, loading};
}