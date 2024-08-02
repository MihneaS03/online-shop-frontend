import { useNavigate } from "react-router-dom";
import { BASE_URL, API_URLS } from "../../constants/url.constant";
import { useAuth } from "../../hooks/auth/useAuth";
import { useCallback } from "react";

const CATEGORIES_BASE_URL: string = BASE_URL + API_URLS.CATEGORIES;

export default function useProductCategoryService() {
  const auth = useAuth();
  const navigate = useNavigate();

  const getAll = useCallback(
    async (signal: AbortSignal | null = null) => {
      try {
        const response = await fetch(CATEGORIES_BASE_URL, {
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

  return { getAll };
}
