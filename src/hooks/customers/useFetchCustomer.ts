import { useCallback, useState } from "react";
import { customerService } from "../../services/customers/customer.service";
import { Customer } from "../../interfaces/customers/customer.interface";

export const useFetchCustomer = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCustomer = useCallback( async (id:string) => {
    try {
      const customer = await customerService.getById(id);
      setCustomer(customer);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occured");
      }
      setCustomer(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {customer, error, loading, fetchCustomer};
}