/* eslint-disable react/prop-types */
import {
  Drawer,
  List,
  ListItemText,
  CssBaseline,
  ListItemButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const LayoutWithDrawer = ({ children }) => {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Home", path: "/home" },
    // Add more menu items here
  ];

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        anchor="left"
        style={{ width: drawerWidth }}
        sx={{
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItemButton key={index} onClick={() => navigate(item.path)}>
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

export default LayoutWithDrawer;
