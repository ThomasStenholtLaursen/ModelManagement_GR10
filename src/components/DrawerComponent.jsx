import React from 'react';
import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const DrawerComponent = ({ children }) => {
    const drawerWidth = 240;


  return (
    <div style={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        anchor="left"
      >
        <Toolbar/>
        <Divider/>
        <List>
          <ListItem component={Link} to="/joblist">
            <ListItemText primary="Job List" />
          </ListItem>
          <ListItem component={Link} to="/models">
            <ListItemText primary="Models" />
          </ListItem>
          <ListItem component={Link} to="/managers">
            <ListItemText primary="Managers" />
          </ListItem>
        </List>
      </Drawer>
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" noWrap>
              Your App Title
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: '64px' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DrawerComponent;