/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import MenuAppBar from "./MenuAppBar";
import DrawerComponent from "./DrawerComponent";

const Layout = ({ children }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <MenuAppBar />
      </Grid>
      <Grid item xs={12} md={3} lg={2}>
        <DrawerComponent/>
      </Grid>
      <Grid item xs={12} md={9} lg={10} style={{marginTop: "90px"}}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Layout;
