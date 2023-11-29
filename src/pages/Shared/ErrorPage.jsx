import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import Paths from "../../config/paths";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection="column"
      sx={{ gap: 5 }}
    >
      <Typography variant="h4">Something went horribly wrong! 😥</Typography>
      <Button variant="contained" onClick={() => handleNavigation(Paths.HOME)}>
        Go to homepage
      </Button>
    </Box>
  );
};

export default ErrorPage;
