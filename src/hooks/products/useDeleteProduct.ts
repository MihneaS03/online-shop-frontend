import { useCallback, useState } from "react";
import useProductService from "../../services/products/product.service";

export const useDeleteProduct = () => {
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const { deleteProduct: deleteService } = useProductService();

  const deleteProduct = useCallback(
    async (id: string) => {
      try {
        setDeleteLoading(true);
        await deleteService(id);
        setDeleteError(null);
      } catch (err) {
        if (err instanceof Error) {
          setDeleteError(err.message);
        } else {
          setDeleteError("An unknown error occured");
        }
      } finally {
        setDeleteLoading(false);
      }
    },
    [deleteService]
  );

  return { deleteError, deleteLoading, deleteProduct };
};
