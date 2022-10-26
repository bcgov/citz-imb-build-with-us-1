import React from 'react';

import { ThemeProvider } from '@mui/material';
import AppRouter from './AppRouter';
import theme from './theme';
import Header from './Layout/Header';
import Footer from './Layout/Footer';

const App = () => (
	<ThemeProvider theme={theme}>
    <Header />
      <AppRouter />
    <Footer />
	</ThemeProvider>
);

export default App;
