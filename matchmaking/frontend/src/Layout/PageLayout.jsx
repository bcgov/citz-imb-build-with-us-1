import { Container } from '@mui/material';
import React from 'react';

const PageLayout = (props) => (
	<Container
		sx={{
			maxWidth: '1096px !important',
			minHeight: props.customHeight || "86.8vh",
			paddingLeft: '2rem',
			paddingRight: '2rem',
			display: 'flex',
			justifyContent: 'center',
		}}
	>
		{props.children}
	</Container>
);

export default PageLayout;
