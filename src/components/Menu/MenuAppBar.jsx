import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button, Grid, Typography } from "@mui/material";
import Paths from "../../config/paths";

export default function MenuAppBar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5" noWrap component="div">
                Model Management
              </Typography>
            </Grid>
            <Grid item>
              {user ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ marginRight: 3 }}
                  >
                    {user.email}
                  </Typography>
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={() => {
                      logoutUser();
                    }}
                  >
                    Logout
                  </Button>
                </Box>
              ) : (
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={() => handleNavigation(Paths.SIGNIN)}
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
