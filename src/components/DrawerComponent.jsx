import React from 'react';
import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Divider, ListItemButton, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';

const DrawerComponent = ({ children }) => {
    const drawerWidth = 240;


  return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
            <List>
                <ListItem component={Link} to="home/joblist">
                    <ListItemText primary="Jobs" />
                </ListItem>
                <ListItem component={Link} to="/models">
                    <ListItemText primary="Models" />
                </ListItem>
                <ListItem component={Link} to="/managers">
                    <ListItemText primary="Managers" />
                </ListItem>
            </List>
        </Box>
        
      </Drawer>
  );
};

export default DrawerComponent;