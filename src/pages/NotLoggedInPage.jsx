import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Page from "./Page";
import { Box, Button, Container, Typography } from "@mui/material";

const NotLoggedInPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user || token) {
      navigate("/home");
    }
  }, [user, token, navigate]);

  return (
    <Page>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          alignItems: "center",
          paddingTop: 5,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ marginBottom: 3 }}
          >
            You are not logged in
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
          >
            Go to Sign In
          </Button>
        </Box>
      </Container>
    </Page>
  );
};

export default NotLoggedInPage;
