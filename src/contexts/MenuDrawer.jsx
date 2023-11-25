/* eslint-disable react/prop-types */
import {
  Drawer,
  List,
  ListItemText,
  CssBaseline,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home"; // Import the icon
import { useNavigate } from "react-router-dom";

const drawerWidth = 100;

const MenuDrawer = ({ children }) => {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Home", path: "/home", icon: <HomeIcon /> }, // Add icon here
    // Add more menu items with their respective icons
  ];

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" style={{ width: drawerWidth }}>
        <List>
          {menuItems.map((item, index) => (
            <ListItemButton key={index} onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon> {/* Display the icon */}
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <main style={{ flexGrow: 1, padding: "20px", marginLeft: drawerWidth }}>
        {children}
      </main>
    </div>
  );
};

export default MenuDrawer;
