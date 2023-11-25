/* eslint-disable react/prop-types */
// Page.jsx
import { Box, Container } from "@mui/material";

const Page = ({ children }) => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ bgcolor: "white", width: "100%", flex: 1 }}>{children}</Box>
    </Container>
  );
};

export default Page;
