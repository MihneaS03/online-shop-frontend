import { createContext, ReactNode, useEffect, useState } from "react";
import { Customer } from "../interfaces/customers/customer.interface";
import { useFetchCustomer } from "../hooks/customers/useFetchCustomer";

export interface IAuthContext {
  customer: Customer | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (
    customer: Customer,
    accessToken: string,
    refreshToken: string
  ) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const {
    error,
    customer: fetchedCustomer,
    fetchCustomer,
  } = useFetchCustomer();

  const login = async (
    customer: Customer,
    accessToken: string,
    refreshToken: string
  ) => {
    console.log(customer);

    localStorage.setItem(
      "user",
      JSON.stringify({ userId: customer.id, accessToken })
    );

    setCustomer(customer);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCustomer(null);
    setAccessToken(null);
    setRefreshToken(null);
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user: { userId: string; accessToken: string } = JSON.parse(
        localStorage.getItem("user")!
      );

      const fetch = async () => {
        await fetchCustomer(user.userId);
      };
      fetch();

      if (!error && fetchedCustomer) {
        setCustomer(fetchedCustomer);
      }
      setAccessToken(user.accessToken);
    }
  }, [fetchedCustomer, fetchCustomer]);

  return (
    <AuthContext.Provider
      value={{ customer, accessToken, refreshToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
