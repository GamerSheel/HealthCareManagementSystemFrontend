import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';

const drawerWidth = 240;

const DashboardLayout = ({ children }) => {

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar/>
      {/* {localStorage.getItem('token') && <Sidebar />} */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* <Toolbar /> */}
        {children}
      </Box>
      <CssBaseline />
    </Box>
  );
};

export default DashboardLayout;