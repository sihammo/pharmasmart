import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiClient } from "../api/client";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "PHARMACY_OWNER" | "ADMIN";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: any) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        
        // Optionally verify token with backend
        apiClient("/auth/profile").then(updatedUser => {
           setUser(updatedUser);
           localStorage.setItem("user", JSON.stringify(updatedUser));
        }).catch(() => {
           // If profile fetch fails, token might be expired
           logout();
        });
      } catch (e) {
        logout();
      }
    }
    setIsLoading(false);
  }, []);

  const login = (data: any) => {
    localStorage.setItem("token", data.token);
    // Be careful here: sometimes the login response has the user fields directly or nested
    const userData = {
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role
    };
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(data.token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
