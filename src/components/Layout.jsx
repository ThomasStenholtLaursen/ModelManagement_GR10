/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import MenuAppBar from "./MenuAppBar";
import DrawerComponent from "./DrawerComponent";

const drawerWidth = 240;
const appBarHeight = 64; // Height of the AppBar

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", boxSizing: "border-box", height: "100vh" }}>
      <MenuAppBar />
      <DrawerComponent width={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 2, // Adds padding top equal to the AppBar's height
          pb: 2, // Padding bottom 2
          px: 2, // Padding left and right 2
          width: `calc(100% - ${drawerWidth}px)`,
          marginTop: `${appBarHeight}px`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
