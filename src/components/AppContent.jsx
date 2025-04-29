import React, { useState } from 'react';
import { CircularProgress, Box } from '@mui/material';
import { useLoginState } from '../providers/AuthProvider';
import LoginPage from './LoginPage/LoginPage'
import Layout from './Layout/Layout';

const AppContent = () => {
  const { isLoggedIn, _ } = useLoginState();

  // Prevent rendering before `isLoggedIn` is determined
  if (isLoggedIn === null) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    isLoggedIn ? <Layout /> : <LoginPage />
  );
};

export default AppContent;