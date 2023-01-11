import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Routes from './Routes';
import Footer from './components/Footer';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material';
import Theme from './Theme';
import { Divider } from '@mui/material';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <ThemeProvider theme={Theme}>
        <Container maxWidth={false} disableGutters={true}>
          <Routes />
        </Container>
        <Container>
          <Divider sx={{ m: 0, p: 0 }} />
          <Footer />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;



