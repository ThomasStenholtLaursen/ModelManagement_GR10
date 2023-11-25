/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ManagerRoute = ({ children }) => {
  const { user } = useAuth();

  return user && user?.role === "Manager" ? (
    children
  ) : (
    <Navigate to="/unauthorized" />
  );
};

export default ManagerRoute;
