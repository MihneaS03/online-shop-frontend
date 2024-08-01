import { useCallback, useState } from "react";
import { productService } from "../../services/products/product.service";
import { EditProductDTO } from "../../interfaces/products/product.interface";

export const useEditProduct = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const editProduct = useCallback( async (id: string, productData: EditProductDTO) => {
    try {
      setLoading(true);
      await productService.update(id, productData)
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
  }, []);

  return {error, loading, editProduct};
}