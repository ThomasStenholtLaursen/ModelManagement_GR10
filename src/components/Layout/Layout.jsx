/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import MenuAppBar from "../Menu/MenuAppBar";
import DrawerComponent from "../Menu/DrawerComponent";

const drawerWidth = 240;
const appBarHeight = 64;

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", boxSizing: "border-box", height: "100vh" }}>
      <MenuAppBar />
      <DrawerComponent width={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 2,
          pb: 2,
          px: 5,
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
