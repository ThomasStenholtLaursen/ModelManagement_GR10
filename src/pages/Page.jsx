/* eslint-disable react/prop-types */
import { Box, Container } from "@mui/material";

const Page = ({ children }) => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 5,
        height: "calc(100vh - 104px)",
        display: "flex",
        overflow: "auto",
      }}
    >
      <Box sx={{ bgcolor: "white", width: "100%", flex: 1 }}>{children}</Box>
    </Container>
  );
};

export default Page;
