import { createContext, ReactNode, useState } from "react";
import { Customer } from "../interfaces/customers/customer.interface";

export interface IAuthContext {
  customer: Customer | null;
  login: (customer: Customer) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [customer, setCustomer] = useState<Customer | null>(null);

  const login = (customer: Customer) => {
    setCustomer(customer);
  };

  const logout = () => {
    setCustomer(null);
  };

  return (
    <AuthContext.Provider value={{ customer, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
