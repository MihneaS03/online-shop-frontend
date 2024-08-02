import { useCallback, useState } from "react";
import { CreateProductDTO } from "../../interfaces/products/product.interface";
import useProductService from "../../services/products/product.service";

export const useCreateProduct = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { create } = useProductService();

  const createProduct = useCallback(
    async (productData: CreateProductDTO) => {
      try {
        setLoading(true);
        await create(productData);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occured");
        }
      } finally {
        setLoading(false);
      }
    },
    [create]
  );

  return { error, loading, createProduct };
};
