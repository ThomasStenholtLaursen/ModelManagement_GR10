import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import Paths from "../../config/paths";

const NotFoundPage = () => {
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
      <Typography variant="h4">This page does not exist 😟</Typography>
      <Button variant="contained" onClick={() => handleNavigation(Paths.HOME)}>
        Go to homepage
      </Button>
    </Box>
  );
};

export default NotFoundPage;
