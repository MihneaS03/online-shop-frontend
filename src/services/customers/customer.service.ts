import { useNavigate } from "react-router-dom";
import { BASE_URL, API_URLS } from "../../constants/url.constant";
import { useAuth } from "../../hooks/auth/useAuth";
import { useCallback } from "react";

const CUSTOMERS_BASE_URL: string = BASE_URL + API_URLS.CUSTOMERS;

export default function useCustomerService() {
  const auth = useAuth();
  const navigate = useNavigate();

  const getById = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`${CUSTOMERS_BASE_URL}/${id}`, {
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

  return { getById };
}
