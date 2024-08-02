import { useCallback, useState } from "react";
import { EditProductDTO } from "../../interfaces/products/product.interface";
import useProductService from "../../services/products/product.service";

export const useEditProduct = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { update } = useProductService();

  const editProduct = useCallback(
    async (id: string, productData: EditProductDTO) => {
      try {
        setLoading(true);
        await update(id, productData);
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
    [update]
  );

  return { error, loading, editProduct };
};
