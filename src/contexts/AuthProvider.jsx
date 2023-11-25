import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const isManager = user?.role === "Manager";
  const isModel = user?.role === "Model";

  //Taken from: https://stackoverflow.com/questions/53835816/decode-jwt-token-react
  const parseJwt = (token) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  const checkTokenAndSetUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = parseJwt(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
      } else {
        setUser({
          ...decoded,
          role: decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ],
        });
      }
    }
  };

  useEffect(() => {
    checkTokenAndSetUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginUser = async (email, password, navigate) => {
    let url = "https://localhost:7181/api/account/login";
    try {
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (response.ok) {
        let token = await response.json();
        localStorage.setItem("token", token.jwt);
        const decoded = parseJwt(token.jwt);
        setUser({
          ...decoded,
          role: decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ],
        });
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
