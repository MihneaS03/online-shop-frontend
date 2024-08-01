import { useCallback, useContext, useState } from "react";
import { Customer, LoginDTO } from "../../interfaces/customers/customer.interface";
import { authService } from "../../services/auth/auth.service";
import { customerService } from "../../services/customers/customer.service";
import { AuthContext } from "../../context/auth.context";

interface LoginReturnType {
  id: string;
  username: string;
  accessToken: string;
  refreshToken: string;
}

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {login: setLoginData} = useContext(AuthContext)

  const login = useCallback( async (userData: LoginDTO) => {
    try {
      setLoading(true);
      const data: LoginReturnType = await authService.login(userData);
      const customer: Customer = await customerService.getById(data.id);
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
  }, [setLoginData]);

  return {error, loading, login};
}