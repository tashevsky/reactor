import { useState } from 'react';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
// layout components
import Menu from './Menu';
import Header from './Header';
import Footer from './Footer';
// path: /
import MainPage from './MainPage/MainPage';
// path: /about
import AboutPage from './AboutPage';
// path: /profile
import UserProfile from './UserProfile/UserProfile';
// path: /feedback
import FeedbackForm from './FeedbackForm';
// path: /admin
import AdminPage from './AdminPage/AdminPage';
// path: /lab/:labId [RESTful API - btw is not used]
import LabContent from './LabContent';
// path: *
import NotFoundPage from './NotFoundPage';

const Layout = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
      <>
        <Header toggleDrawer={() => setDrawerOpen(!drawerOpen)} />
        <Menu open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '94vh' }}>
          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/feedback" element={<FeedbackForm />} />
              <Route path="/admin" element={<AdminPage/>}/>
              <Route path="/lab/:labId" element={<LabContent />} />
              <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </Box>
      </>
    );
}

export default Layout;