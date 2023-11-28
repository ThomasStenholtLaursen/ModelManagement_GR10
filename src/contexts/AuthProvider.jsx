import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { parseTokenToUser } from "../helpers/ParseToken";
import { getTokenExpiration } from "../helpers/TokenExpiration";
import useLoginUser from "../hooks/useLoginUser";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const { login, isLoading } = useLoginUser();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(parseTokenToUser(token));
  const isManager = user?.role === "Manager";
  const isModel = user?.role === "Model";

  useEffect(() => {
    const checkTokenExpiration = () => {
      const exp = getTokenExpiration(token);
      if (exp && Date.now() >= exp * 1000) {
        logoutUser();
      }
    };

    const interval = setInterval(checkTokenExpiration, 300000); // Check token expiration every 5 minute

    return () => clearInterval(interval);
  }, [token]);

  const loginUser = async (email, password) => {
    const result = await login(email, password);
    if (result) {
      setToken(result.token);
      setUser(result.user);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isManager,
        isModel,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
