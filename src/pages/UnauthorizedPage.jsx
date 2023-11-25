import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import Page from "./Page";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/home");
  };

  return (
    <Page>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
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
    </Page>
  );
};

export default UnauthorizedPage;
