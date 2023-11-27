    import React from 'react';
    import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
    import DrawerComponent from '../components/DrawerComponent';
    import Page from './Page';
    import { AppBar, Box, Button, Container, CssBaseline, Grid, Toolbar, Typography} from '@mui/material';
    import JobListPage from './JobListPage';
    import ModelsPage from './ModelsPage';
    import ManagersPage from './ManagersPage';
    import PrivateRoute from '../routes/PrivateRoute';
    import { useAuth } from '../hooks/useAuth';

    const MainPage = () => {

        const { user, logoutUser } = useAuth();
    
        return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    
                    <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'left' }}>Model management</Typography>
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
                </Toolbar>
            </AppBar>
            <DrawerComponent />
            <Container>
                <Routes>
                <Route
                        path="home/joblist"
                        element={
                        <PrivateRoute>
                            <JobListPage />
                        </PrivateRoute>
                        }
                    />
                    <Route
                        path="home/models"
                        element={
                        <PrivateRoute>
                            <ModelsPage />
                        </PrivateRoute>
                        }
                    />
                    <Route
                        path="home/managers"
                        element={
                        <PrivateRoute>
                            <ManagersPage />
                        </PrivateRoute>
                        }
                    />
                </Routes>
            </Container>
        </Box>
    );
    };

    export default MainPage;