import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import PageLayout from '../Layout/PageLayout';
import heartImage from '../../public/heart.png';
import diversityImage from '../../public/diversity.jpg';

const HomePage = () => (
	<PageLayout>
		<Grid
			container
			alignItems="center"
			justifyContent="center"
			sx={{ width: '100%' }}
		>
			<Grid item xs={12} md={6}>
				<Stack>
					<Typography variant="h3" fontWeight="bold">
						Welcome to
					</Typography>
					<Stack direction="row" alignItems="center" spacing={2}>
						<Typography
							variant="h3"
							fontWeight="bold"
							sx={{ color: '#9b9a9a' }}
						>
							CITZ IMB
						</Typography>
						<img
							src={heartImage}
							style={{ maxHeight: '40px' }}
							alt="Red heart icon"
						/>
					</Stack>
				</Stack>
			</Grid>
			<Grid item xs={12} md={6}>
				<img
					src={diversityImage}
					style={{ maxWidth: '100%', borderRadius: '25px' }}
					alt="Artwork showing diversity"
				/>
			</Grid>
		</Grid>
	</PageLayout>
);

export default HomePage;
