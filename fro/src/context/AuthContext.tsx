import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const API_URL = "http://localhost:5000/api/auth";

type User = {
  id: number;
  name: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (name: string, password: string) => Promise<void>;
  register: (name: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyAuth() {
      const stored = localStorage.getItem("token");
      if (!stored) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/verify`, {
          headers: { Authorization: `Bearer ${stored}` },
        });

        if (res.ok) {
          const { data } = await res.json();
          setUser(data);
          setToken(stored);
        } else {
          localStorage.removeItem("token");
          setToken(null);
        }
      } catch {
        localStorage.removeItem("token");
        setToken(null);
      } finally {
        setLoading(false);
      }
    }

    verifyAuth();
  }, []);

  const login = async (name: string, password: string) => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.error || "Login failed");
    }

    localStorage.setItem("token", json.data.token);
    setToken(json.data.token);
    setUser(json.data.user);
  };

  const register = async (name: string, password: string) => {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password, role: "admin" }),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.error || "Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
