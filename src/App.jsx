// App.jsx
import React from "react";
import SignInPage from "./pages/SignInPage";
import { ThemeProvider, createTheme } from "@mui/material";
import MainPage from "./pages/MainPage";

function App() {
  const defaultTheme = createTheme();

  return (
    <React.Fragment>
      <ThemeProvider theme={defaultTheme}>
        <MainPage />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
