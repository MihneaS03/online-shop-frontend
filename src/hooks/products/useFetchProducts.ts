import { useEffect, useState } from "react";
import { Product } from "../../interfaces/products/product.interface";
import useProductService from "../../services/products/product.service";

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { getAll } = useProductService();

  useEffect(() => {
    const controller = new AbortController();

    const fetchAllProducts = async () => {
      try {
        const allProducts = await getAll(controller.signal);
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
  }, [getAll]);

  return { products, error, loading };
};
