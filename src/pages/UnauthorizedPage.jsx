import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/home");
  };

  return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          You do not have permission to view this page.
        </Typography>
        <Button variant="contained" color="primary" onClick={goBack}>
          Go Back
        </Button>
      </Box>
  );
};

export default UnauthorizedPage;
