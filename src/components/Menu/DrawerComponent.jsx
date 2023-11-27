import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Paths from "../../config/paths";

export default function DrawerComponent() {
  const { isManager } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const drawerWidth = 220;
  return (
    <Box>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation(Paths.HOME)}>
                <ListItemIcon>{<HomeIcon />}</ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation(Paths.JOBS)}>
                <ListItemIcon>{<WorkIcon />}</ListItemIcon>
                <ListItemText primary={"Jobs"} />
              </ListItemButton>
            </ListItem>
            {isManager && (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigation(Paths.MODELS)}
                  >
                    <ListItemIcon>{<PersonIcon />}</ListItemIcon>
                    <ListItemText primary={"Models"} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigation(Paths.MANAGERS)}
                  >
                    <ListItemIcon>{<PersonIcon />}</ListItemIcon>
                    <ListItemText primary={"Managers"} />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
