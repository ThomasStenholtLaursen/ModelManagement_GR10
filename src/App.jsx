import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" style={{ width: "100%" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Model Management
          </Typography>
          {/* Login button and then the login modal component */}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default App;
