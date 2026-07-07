import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  // ================= TOKEN =================
  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  // ================= USER =================
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // ================= LOADING =================
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  // ================= LOGIN =================
  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);
  };

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("settings");

    setToken("");
    setUser(null);
  };

  // ================= UPDATE USER =================
  const updateUser = (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  // ================= ROLE =================
  const role = user?.role || "Employee";

  const isAdmin = role === "admin";

  const isEmployee = role === "Employee";

  // ================= PROVIDER =================
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        role,

        loading,

        login,
        logout,
        updateUser,

        isAuthenticated: !!token,
        isAdmin,
        isEmployee,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}