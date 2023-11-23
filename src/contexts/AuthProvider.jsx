/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import * as jwt_decode from "jwt-decode";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const isManager = user?.role === "Manager";
  const isModel = user?.role === "Model";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loginUser(token);
    }
  }, []);

  const loginUser = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwt_decode(token);
    setUser(decoded);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isManager, isModel, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
