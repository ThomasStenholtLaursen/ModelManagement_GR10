import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import PrivateRoute from "./routes/PrivateRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import MainPage from "./pages/MainPage";

function App() {
  const defaultTheme = createTheme({ palette: { mode: "light" } });

  return (
    <React.Fragment>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to={"/signin"} replace />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <MainPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
