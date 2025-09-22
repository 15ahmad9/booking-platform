// src/context/AuthContext.jsx
import React, { createContext, useEffect, useState } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("bb_user");
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("bb_token") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && !user) {
      // optionally fetch user profile
      (async () => {
        try {
          const me = await authService.me();
          if (me) {
            setUser(me);
            localStorage.setItem("bb_user", JSON.stringify(me));
          }
        } catch (e) {
          console.warn("fetch me failed", e.message);
        }
      })();
    }
  }, [token]);

  const login = (userData, tokenStr) => {
    setUser(userData);
    setToken(tokenStr);
    localStorage.setItem("bb_user", JSON.stringify(userData));
    localStorage.setItem("bb_token", tokenStr);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("bb_user");
    localStorage.removeItem("bb_token");
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const res = await authService.register(payload);
      setLoading(false);
      return res;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
