import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import ApplicationRoutes from "./routes/ApplicationRoutes";

function App() {
  const defaultTheme = createTheme({ palette: { mode: "light" } });

  return (
    <React.Fragment>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Router>
          <ApplicationRoutes />
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
