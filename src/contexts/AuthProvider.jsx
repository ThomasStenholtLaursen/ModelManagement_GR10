import { createContext, useState } from "react";
import PropTypes from "prop-types";
import API_URLS from "../config/config";
import { parseTokenToUser } from "../helpers/ParseToken";
import { useSnackbar } from "notistack";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(parseTokenToUser(token));
  const [isLoading, setIsLoading] = useState(false);
  const isManager = user?.role === "Manager";
  const isModel = user?.role === "Model";

  const loginUser = async (email, password) => {
    try {
      setIsLoading(true);
      let response = await fetch(API_URLS.LOGIN, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (response.ok) {
        let data = await response.json();
        localStorage.setItem("token", data.jwt);
        setToken(data.jwt);
        setUser(parseTokenToUser(data.jwt));
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        enqueueSnackbar("Email or password is incorrect", {
          variant: "error",
        });
        return false;
      }
    } catch (err) {
      setIsLoading(false);
      enqueueSnackbar("An error occurred - please try again", {
        variant: "error",
      });
      return false;
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
