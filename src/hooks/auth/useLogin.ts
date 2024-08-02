import { useCallback, useContext, useState } from "react";
import {
  Customer,
  LoginDTO,
} from "../../interfaces/customers/customer.interface";
import { AuthContext } from "../../context/auth.context";
import useAuthService from "../../services/auth/auth.service";
import useCustomerService from "../../services/customers/customer.service";

interface LoginReturnType {
  id: string;
  username: string;
  accessToken: string;
  refreshToken: string;
}

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { login: loginUser } = useAuthService();
  const { getById } = useCustomerService();

  const { login: setLoginData } = useContext(AuthContext);

  const login = useCallback(
    async (userData: LoginDTO) => {
      try {
        setLoading(true);
        const data: LoginReturnType = await loginUser(userData);
        const customer: Customer = await getById(data.id);
        setLoginData(customer, data.accessToken, data.refreshToken);
        setError(null);
        return true;
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occured");
        }
        return false;
      } finally {
        setLoading(false);
      }
    },
    [setLoginData, getById, loginUser]
  );

  return { error, loading, login };
};
