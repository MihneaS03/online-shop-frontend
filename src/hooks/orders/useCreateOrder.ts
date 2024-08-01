import { useCallback, useState } from "react";
import { CreateOrderDTO } from "../../interfaces/orders/order.interface";
import { orderService } from "../../services/orders/order.service";

export const useCreateOrder = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const createOrder = useCallback( async (orderData: CreateOrderDTO) => {
    try {
      setLoading(true);
      await orderService.create(orderData)
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

  return {error, loading, createOrder};
}