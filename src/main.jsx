import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import { SnackbarProvider } from "notistack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <AuthProvider>
        <App />
      </AuthProvider>
    </SnackbarProvider>
  </LocalizationProvider>
);
