/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  return user || token ? children : <Navigate to="/not-logged-in" />;
};

export default PrivateRoute;
