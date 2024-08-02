import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { CustomerDTO } from "../interfaces/customers/customer.interface";
import { USER_LOCAL_STORAGE } from "../constants/local-storage.constant";

export interface IAuthContext {
  user: CustomerDTO | null;
  accessToken: string | null;
  login: (customer: CustomerDTO, accessToken: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [customer, setCustomer] = useState<CustomerDTO | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = async (customer: CustomerDTO, accessToken: string) => {
    localStorage.setItem(
      USER_LOCAL_STORAGE,
      JSON.stringify({
        id: customer.id,
        username: customer.username,
        userRole: customer.role,
        accessToken,
      })
    );

    setCustomer(customer);
    setAccessToken(accessToken);
  };

  const logout = () => {
    localStorage.removeItem(USER_LOCAL_STORAGE);
    setCustomer(null);
    setAccessToken(null);
  };

  useEffect(() => {
    const userData = localStorage.getItem(USER_LOCAL_STORAGE);
    if (userData) {
      const user: {
        id: string;
        username: string;
        role: string;
        accessToken: string;
      } = JSON.parse(userData);
      setCustomer(user);
      setAccessToken(user.accessToken);
    }
  }, []);

  const value = useMemo(
    () => ({ user: customer, accessToken, login, logout }),
    [accessToken, customer]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
