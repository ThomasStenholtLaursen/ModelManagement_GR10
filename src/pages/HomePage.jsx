import { Typography } from "@mui/material";
import Page from "./Page";
import { useAuth } from "../hooks/useAuth"; // Assuming useAuth is your custom hook for authentication

const HomePage = () => {
  const { user } = useAuth();

  return (
    <Page>
      <Typography variant="h5" gutterBottom>
        Welcome
      </Typography>
      {user && (
        <>
          <Typography variant="subtitle1">Role: {user.role}</Typography>
          <Typography variant="subtitle1">Email: {user.email}</Typography>
        </>
      )}
    </Page>
  );
};

export default HomePage;
