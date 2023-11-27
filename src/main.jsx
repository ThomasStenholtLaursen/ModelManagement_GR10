import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SnackbarProvider
    maxSnack={1}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  >
    <AuthProvider>
      <App />
    </AuthProvider>
  </SnackbarProvider>
);
