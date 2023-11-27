import { Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth"; // Assuming useAuth is your custom hook for authentication

const HomePage = () => {
  const { user } = useAuth();

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Welcome
      </Typography>
      {user && (
        <>
          <Typography variant="subtitle1">Role: {user.role}</Typography>
          <Typography variant="subtitle1">Email: {user.email}</Typography>
        </>
      )}
    </>
  );
};

export default HomePage;
