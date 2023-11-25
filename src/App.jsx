// App.jsx
import React from "react";
import SignInPage from "./pages/SignInPage";
import { ThemeProvider, createTheme } from "@mui/material";

function App() {
  const defaultTheme = createTheme();

  return (
    <React.Fragment>
      <ThemeProvider theme={defaultTheme}>
        <SignInPage />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
