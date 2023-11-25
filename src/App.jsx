import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import NotLoggedInPage from "./pages/NotLoggedInPage";
import { ThemeProvider, createTheme } from "@mui/material";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const defaultTheme = createTheme();

  return (
    <React.Fragment>
      <ThemeProvider theme={defaultTheme}>
        <Router>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/not-logged-in" element={<NotLoggedInPage />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomePage />
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
