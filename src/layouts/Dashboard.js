import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

import { Box, CssBaseline, Paper as MuiPaper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { spacing } from '@mui/system';

import { ToastContainer } from 'react-toastify';
import GlobalStyle from '../components/GlobalStyle';
import Navbar from '../components/navbar/Navbar';
// import dashboardItems from '../components/sidebar/dashboardItems';
import Sidebar from '../components/sidebar/Sidebar';
import Footer from '../components/Footer';
import Settings from '../components/Settings';

import { getPageSection } from '../components/sidebar/dashboardItems';

const drawerWidth = 258;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Drawer = styled.div`
  ${(props) => props.theme.breakpoints.up('md')} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

const Dashboard = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = [
    {
      title: 'Pages',
      pages: getPageSection(),
    },
  ];
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <Drawer>
        <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
          <Sidebar
            PaperProps={{
              style: { width: drawerWidth },
            }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            closeDrawer={handleDrawerToggle}
            items={items}
          />
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Sidebar
            PaperProps={{ style: { width: drawerWidth } }}
            items={items}
          />
        </Box>
      </Drawer>
      <AppContent>
        <Navbar onDrawerToggle={handleDrawerToggle} />
        {/* <MainContent p={isLgUp ? 12 : 5}> */}
        <MainContent p={isLgUp ? 4 : 4}>
          {children}
          <Outlet />
        </MainContent>
        <Footer />
        <ToastContainer />
      </AppContent>
      <Settings />
    </Root>
  );
};

export default Dashboard;
