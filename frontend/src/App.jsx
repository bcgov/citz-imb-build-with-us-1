import React from 'react';
import { ThemeProvider } from '@mui/material';
import AppRouter from './AppRouter';
import theme from './theme';

const App = () => (
	<ThemeProvider theme={theme}>
		<AppRouter />
	</ThemeProvider>
);

export default App;
