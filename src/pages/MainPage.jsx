import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import DrawerComponent from '../components/DrawerComponent';
import Page from './Page';
import { Container, CssBaseline} from '@mui/material';
import JobListPage from './JobListPage';
import ModelsPage from './ModelsPage';
import ManagersPage from './ManagersPage';

const MainPage = () => {
  return (
    <Router>
      <DrawerComponent>
        <CssBaseline />
        <Container>
          <Page>
            <Routes>
                <Route path="/joblist" element={<JobListPage />} />
                <Route path="/models" element={<ModelsPage />}/>
                <Route path="/managers" element={<ManagersPage />} />
            </Routes>
          </Page>
        </Container>
      </DrawerComponent>
    </Router>
  );
};

export default MainPage;