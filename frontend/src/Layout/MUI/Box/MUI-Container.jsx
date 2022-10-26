import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/system';

export const MUIContainer = ({ children }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        {children}
      </Container>
    </React.Fragment>
  );
}
