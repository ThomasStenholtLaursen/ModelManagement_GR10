import { createContext, useState } from "react";
import PropTypes from "prop-types";
import API_URLS from "../config/config";
import { parseTokenToUser } from "../helpers/ParseToken";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(parseTokenToUser(token));
  const isManager = user?.role === "Manager";
  const isModel = user?.role === "Model";

  const loginUser = async (email, password, navigate) => {
    try {
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
        navigate("/home");
      } else {
        alert("Server returned: " + response.statusText);
      }
    } catch (err) {
      alert("Error: " + err);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
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

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
