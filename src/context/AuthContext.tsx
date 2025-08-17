import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { loginUser, registerUser } from "../services/api";

type User = { id?: string; name?: string; email?: string; role?: string } | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  const getToken = async () => SecureStore.getItemAsync("token");

  const hydrateUser = async () => {
    try {
      const token = await getToken();
      if (!token) return setUser(null);
      // Optionnel : récupérer user depuis backend si tu as une route /me
      setUser({}); 
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hydrateUser();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password); // utilise api.ts
    setUser(data.user);
    await SecureStore.setItemAsync("token", data.token);
  };

  const register = async (name: string, email: string, password: string, confirmPassword: string) => {
    const data = await registerUser(name, email, password, confirmPassword); // api.ts
    setUser(data.user);
    await SecureStore.setItemAsync("token", data.token);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans AuthProvider");
  return ctx;
};
export default AuthContext;