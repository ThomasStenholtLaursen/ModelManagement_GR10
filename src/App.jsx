import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import { ThemeProvider, createTheme } from "@mui/material";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const defaultTheme = createTheme();

  return (
    <React.Fragment>
      <ThemeProvider theme={defaultTheme}>
        <Router>
          <Routes>
            <Route path="/signin" element={<SignInPage />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to={"/signin"} replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
