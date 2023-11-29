/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ModelRoute = ({ children }) => {
  const { user, isModel } = useAuth();

  return user && isModel ? children : <Navigate to="/unauthorized" />;
};

export default ModelRoute;
