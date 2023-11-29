import { Routes, Route, Navigate } from "react-router-dom";
import Paths from "../config/paths";
import ConditionalAuthenticatedRoute from "./AuthenticatedRoute";
import UnauthorizedPage from "../pages/Shared/UnauthorizedPage";
import PrivateRoute from "./PrivateRoute";
import Layout from "../components/Layout/Layout";
import SignInPage from "../pages/Shared/SignInPage";
import HomePage from "../pages/Shared/HomePage";
import ManagerRoute from "./ManagerRoute";
import ModelsPage from "../pages/Manager/ModelsPage";
import AddModelPage from "../pages/Manager/AddModelPage";
import ManagersPage from "../pages/Manager/ManagersPage";
import JobsPage from "../pages/Shared/JobsPage";
import ModelJobPage from "../pages/Model/ModelJobPage";
import ModelRoute from "./ModelRoute";
import ErrorPage from "../pages/Shared/ErrorPage";
import NotFoundPage from "../pages/Shared/NotFoundPage";
import ManagerJobPage from "../pages/Manager/ManagerJobPage";

const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route
        path={Paths.SIGNIN}
        element={
          <ConditionalAuthenticatedRoute>
            <SignInPage />
          </ConditionalAuthenticatedRoute>
        }
      />
      <Route path={Paths.UNAUTHORIZED} element={<UnauthorizedPage />} />
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
                <ManagersPage />
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
      <Route
        path={Paths.JOB}
        element={
          <PrivateRoute>
            <Layout>
              <ManagerJobPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path={Paths.JOBEXPENSE}
        element={
          <PrivateRoute>
            <ModelRoute>
              <Layout>
                <ModelJobPage />
              </Layout>
            </ModelRoute>
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Navigate to={Paths.SIGNIN} replace />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default ApplicationRoutes;
