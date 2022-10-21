import { Container } from '@mui/material';
import React from 'react';

const PageLayout = ({ children }) => (
	<Container
		sx={{
			maxWidth: '1096px',
			width: '1096px',
			minHeight: '87vh',
			paddingLeft: '2rem',
			paddingRight: '2rem',
			display: 'flex',
			justifyContent: 'center',
		}}
	>
		{children}
	</Container>
);

export default PageLayout;