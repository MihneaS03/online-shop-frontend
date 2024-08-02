import { useCallback, useState } from "react";
import { Customer } from "../../interfaces/customers/customer.interface";
import useCustomerService from "../../services/customers/customer.service";

export const useFetchCustomer = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { getById } = useCustomerService();

  const fetchCustomer = useCallback(
    async (id: string) => {
      try {
        const customer = await getById(id);
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
    },
    [getById]
  );

  return { customer, error, loading, fetchCustomer };
};
