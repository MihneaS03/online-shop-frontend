import { useCallback, useState } from "react";
import { Product } from "../../interfaces/products/product.interface";
import useProductService from "../../services/products/product.service";

export const useFetchProduct = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { getById } = useProductService();

  const fetchProduct = useCallback(
    async (id: string, signal: AbortSignal) => {
      try {
        const product = await getById(id, signal);
        setProduct(product);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occured");
        }
        setProduct(null);
      } finally {
        setLoading(false);
      }
    },
    [getById]
  );

  const setProductFromState = useCallback((product: Product) => {
    setProduct(product);
  }, []);

  return { product, error, loading, fetchProduct, setProductFromState };
};
