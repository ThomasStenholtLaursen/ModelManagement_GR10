import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";

export default function MenuAppBar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Button
                color="inherit"
                startIcon={<HomeIcon />}
                onClick={() => handleNavigation("/home")}
              >
                Home
              </Button>
              {user?.role === "Manager" && (
                <>
                  <Button
                    color="inherit"
                    onClick={() => handleNavigation("/managers")}
                    startIcon={<PersonIcon />}
                  >
                    Managers
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={<PersonIcon />}
                    onClick={() => handleNavigation("/models")}
                  >
                    Models
                  </Button>
                </>
              )}
              <Button
                color="inherit"
                startIcon={<WorkIcon />}
                onClick={() => handleNavigation("/jobs")}
              >
                Jobs
              </Button>
            </Grid>

            <Grid item>
              {user ? (
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={() => {
                    logoutUser();
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={() => handleNavigation("/signin")}
                >
                  Login
                </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
