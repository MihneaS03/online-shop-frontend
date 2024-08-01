import { useEffect, useState } from "react";
import { ProductCategory } from "../../interfaces/products/product.interface";
import { productCategoryService } from "../../services/products/product-category.service";

export const useFetchCategories = () => {
  const [categories, setCategories] = useState<ProductCategory[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchAllCategories = async () => {
      try {
        const allCategories = await productCategoryService.getAll(controller.signal);
        setCategories(allCategories);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occured");
        }
        setCategories(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategories();

    return () => controller.abort();
  }, []);


  return {categories, error, loading};
}