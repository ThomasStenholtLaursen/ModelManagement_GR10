import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button, Grid, Typography } from "@mui/material";

export default function MenuAppBar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };


  return (
    <Box>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h6" noWrap component="div">
                Model Management
              </Typography>
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
  )
}
