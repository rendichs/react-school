import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import authService from "@/services/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => authService.get());

  const login = (authData) => {
    authService.save(authData);
    setAuth(authData);
  };

  const logout = () => {
    authService.logout();
    setAuth(null);
  };

  const value = useMemo(
    () => ({
      auth,
      user: auth
        ? {
            id: auth.user_id,
            role: auth.role,
            nama_lengkap: auth.nama_lengkap,
          }
        : null,
      token: auth?.token || null,
      isAuthenticated: Boolean(auth?.token),
      login,
      logout,
    }),
    [auth]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth harus digunakan di dalam AuthProvider."
    );
  }

  return context;
};

export default AuthContext;