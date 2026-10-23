import { createContext } from "react";

export type CurrentUser = {
  id: string | number;
  email: string;
  accountNumber: string;
};

export type AuthContextType = {
  user: CurrentUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshAuth: () => Promise<void>;
};

export const AuthContext =
  createContext<AuthContextType | undefined>(undefined);
