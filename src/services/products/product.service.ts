import { useNavigate } from "react-router-dom";
import { BASE_URL, API_URLS } from "../../constants/url.constant";
import { useAuth } from "../../hooks/auth/useAuth";
import {
  CreateProductDTO,
  EditProductDTO,
} from "../../interfaces/products/product.interface";
import { useCallback } from "react";

const PRODUCTS_BASE_URL: string = BASE_URL + API_URLS.PRODUCTS;

export default function useProductService() {
  const auth = useAuth();
  const navigate = useNavigate();

  const getAll = useCallback(
    async (signal: AbortSignal | null = null) => {
      try {
        const response = await fetch(PRODUCTS_BASE_URL, {
          signal,
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        });

        if (!response.ok) {
          if (response.status === 401) {
            navigate("/login");
          }
          throw new Error(`HTTP error: Status ${response.status}`);
        }

        return response.json();
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    [navigate, auth.accessToken]
  );

  const getById = useCallback(
    async (id: string, signal: AbortSignal) => {
      try {
        const response = await fetch(`${PRODUCTS_BASE_URL}/${id}`, {
          signal,
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        });

        if (!response.ok) {
          if (response.status === 401) {
            navigate("/login");
          }
          throw new Error(`HTTP error: Status ${response.status}`);
        }

        return response.json();
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    [navigate, auth.accessToken]
  );

  const create = useCallback(
    async (productData: CreateProductDTO) => {
      try {
        const response = await fetch(PRODUCTS_BASE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
          body: JSON.stringify(productData),
        });

        if (!response.ok) {
          if (response.status === 401) {
            navigate("/login");
          }
          throw new Error(`HTTP error: Status ${response.status}`);
        }

        return response.json();
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    [navigate, auth.accessToken]
  );

  const update = useCallback(
    async (id: string, productData: EditProductDTO) => {
      try {
        const response = await fetch(`${PRODUCTS_BASE_URL}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
          body: JSON.stringify(productData),
        });

        if (!response.ok) {
          if (response.status === 401) {
            navigate("/login");
          }
          throw new Error(`HTTP error: Status ${response.status}`);
        }

        return response.json();
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    [navigate, auth.accessToken]
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`${PRODUCTS_BASE_URL}/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        });

        if (!response.ok) {
          if (response.status === 401) {
            navigate("/login");
          }
          throw new Error(`HTTP error: Status ${response.status}`);
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    [navigate, auth.accessToken]
  );

  return { getAll, getById, create, update, deleteProduct };
}
