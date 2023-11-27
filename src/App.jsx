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
import Layout from "./components/Layout/Layout";
import JobsPage from "./pages/JobsPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import Paths from "./config/paths";
import AddModelPage from "./pages/AddModelPage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthenticatedRoute from "./routes/AuthenticatedRoute";

function App() {
  const defaultTheme = createTheme({ palette: { mode: "light" } });

  return (
    <React.Fragment>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route
              path={Paths.SIGNIN}
              element={
                <AuthenticatedRoute>
                  <SignInPage />
                </AuthenticatedRoute>
              }
            />
            <Route
              path={Paths.UNAUTHORIZED}
              element={
                <Layout>
                  <UnauthorizedPage />{" "}
                </Layout>
              }
            />
            <Route
              path={Paths.HOME}
              element={
                <PrivateRoute>
                  <Layout>
                    <HomePage />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path={Paths.MODELS}
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
              path={Paths.ADDMODEL}
              element={
                <PrivateRoute>
                  <ManagerRoute>
                    <Layout>
                      <AddModelPage />
                    </Layout>
                  </ManagerRoute>
                </PrivateRoute>
              }
            />
            <Route
              path={Paths.MANAGERS}
              element={
                <PrivateRoute>
                  <ManagerRoute>
                    <Layout>
                      <ManagerPage />
                    </Layout>
                  </ManagerRoute>
                </PrivateRoute>
              }
            />

            <Route
              path={Paths.JOBS}
              element={
                <PrivateRoute>
                  <Layout>
                    <JobsPage />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to={Paths.SIGNIN} replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
