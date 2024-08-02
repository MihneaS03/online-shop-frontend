import { useNavigate } from "react-router-dom";
import { BASE_URL, API_URLS } from "../../constants/url.constant";
import { CreateOrderDTO } from "../../interfaces/orders/order.interface";
import { useAuth } from "../../hooks/auth/useAuth";
import { useCallback } from "react";

const ORDERS_BASE_URL: string = BASE_URL + API_URLS.ORDERS;

export default function useOrderService() {
  const auth = useAuth();
  const navigate = useNavigate();

  const create = useCallback(
    async (orderData: CreateOrderDTO) => {
      try {
        const response = await fetch(ORDERS_BASE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
          body: JSON.stringify(orderData),
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

  return { create };
}
