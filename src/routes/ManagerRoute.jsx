/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ManagerRoute = ({ children }) => {
  const { user, isManager } = useAuth();

  return user && isManager ? (
    children
  ) : (
    <Navigate to="/unauthorized" />
  );
};

export default ManagerRoute;
