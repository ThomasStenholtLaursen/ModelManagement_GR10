/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ConditionalAuthenticatedRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? <Navigate to="/home" /> : children;
};

export default ConditionalAuthenticatedRoute;
