import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import PrivateRoute from "./routes/PrivateRoute";
import ManagerRoute from "./routes/ManagerRoute";
import ModelsPage from "./pages/ModelsPage";
import ManagerPage from "./pages/ManagerPage";
import Layout from "./components/Layout";
import JobsPage from "./pages/JobsPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";

function App() {
  const defaultTheme = createTheme({ palette: { mode: "light" } });

  return (
    <React.Fragment>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Layout>
                    <HomePage />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/models"
              element={
                <PrivateRoute>
                  <ManagerRoute>
                    <Layout>
                      <ModelsPage />
                    </Layout>
                  </ManagerRoute>
                </PrivateRoute>
              }
            />
            <Route
              path="/managers"
              element={
                <PrivateRoute>
                  <Layout>
                    <ManagerPage />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/jobs"
              element={
                <PrivateRoute>
                  <Layout>
                    <JobsPage />
                  </Layout>
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
