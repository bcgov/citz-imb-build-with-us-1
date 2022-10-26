import React from 'react';
import { useNavigate } from 'react-router';
import { AppBar, Toolbar, Box, Typography, Button, Stack, IconButton, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import BCGovLogo from '../../public/BCGovLogo.png';

const Header = (props) => {
	const navigate = useNavigate();
	const [anchorElNav, setAnchorElNav] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<Box
			sx={{
				border: 'solid',
				borderColor: 'header.border',
				borderWidth: '0px 0px 0.3vh 0px',
				minHeight: '6.5vh',
			}}
		>
			<AppBar
				position="static"
				color="transparent"
				elevation={0}
				sx={{
					maxWidth: '1096px',
					margin: 'auto',
				}}
			>
				<Toolbar>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'flex', md: 'none' },
							alignItems: 'center',
						}}
					>
						<Box
							sx={{
								backgroundColor: 'header.border',
								borderRadius: '10px',
								height: '50px !important',
								width: '50px !important',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								padding: 0,
								marginRight: '1rem',
								cursor: 'pointer',
							}}
							onClick={() => navigate('/')}
						>
							<img
								src={BCGovLogo}
								style={{ maxHeight: '23px' }}
								alt="Logo for the Government of British Columbia"
							/>
						</Box>
						<Typography
							variant="h6"
							component="div"
							sx={{ fontWeight: 'bold', flexGrow: 1 }}
						>
							IMB Onboarding(Beta)
						</Typography>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							<MenuItem onClick={() => navigate('/team-a')}>
								<Typography textAlign="center">Team A</Typography>
							</MenuItem>
							<MenuItem onClick={() => navigate('/team-b')}>
								<Typography textAlign="center">Team B</Typography>
							</MenuItem>
							<MenuItem onClick={() => navigate('/team-c')}>
								<Typography textAlign="center">Team C</Typography>
							</MenuItem>
							<MenuItem onClick={() => navigate('/team-d')}>
								<Typography textAlign="center">Leaderboard</Typography>
							</MenuItem>
              <MenuItem onClick={() => navigate('/timer')}>
								<Typography textAlign="center">Timer</Typography>
							</MenuItem>
						</Menu>
					</Box>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' },
							alignItems: 'center',
						}}
					>
						<Box
							sx={{
								backgroundColor: 'header.border',
								borderRadius: '10px',
								height: '50px',
								width: '50px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								padding: 0,
								marginRight: '1rem',
								cursor: 'pointer',
							}}
							onClick={() => navigate('/')}
						>
							<img
								src="/BCGovLogo.png"
								style={{ maxHeight: '23px' }}
								alt="Logo for the Government of British Columbia"
							/>
						</Box>
						<Typography
							variant="h6"
							component="div"
							sx={{ fontWeight: 'bold', flexGrow: 1 }}
						>
							IMB Onboarding(Beta)
						</Typography>
						<Stack direction="row" spacing={3}>
							<Button
								color="inherit"
								sx={{ textTransform: 'none' }}
								onClick={() => navigate('/team-a')}
							>
								Team A
							</Button>
							<Button
								color="inherit"
								sx={{ textTransform: 'none' }}
								onClick={() => navigate('/team-b')}
							>
								Team B
							</Button>
							<Button
								color="inherit"
								sx={{ textTransform: 'none' }}
								onClick={() => navigate('/team-c')}
							>
								Team C
							</Button>
							<Button
								color="inherit"
								sx={{ textTransform: 'none' }}
								onClick={() => navigate('/team-d')}
							>
								Team D
							</Button>
              <Button
								color="inherit"
								sx={{ textTransform: 'none' }}
								onClick={() => navigate('/timer')}
							>
								Timer
							</Button>
						</Stack>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
