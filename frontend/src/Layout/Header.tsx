import { Box, AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import WidthLayout from './WidthLayout';
import { useNavigate } from 'react-router';

const Header = () => {
  const navigate = useNavigate()

  return (
    <Box 
      sx={{ 
        border: "solid", 
        borderColor: "header.border", 
        borderWidth: "0px 0px 2px 0px", 
        display: "flex", 
        justifyContent: "center", 
        height: "8.5vh" 
      }} 
    >
      <AppBar position="static" color="transparent" elevation={0} sx={{ maxWidth: `1096px` }}>
        <WidthLayout>
          <Toolbar sx={{ padding: "0 !important" }}>
            <Box
              sx={{
                  backgroundColor: "header.border",
                  borderRadius: "10px",
                  minHeight: "50px",
                  minWidth: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 0,
                  marginRight: "1rem",
                  cursor: "pointer"
              }}
              onClick={() => navigate("/")}
            >
              <img src="/BCGovLogo.png" style={{ maxHeight: "23px" }} />
            </Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: "bold", flexGrow: 1 }}>
              S1E1 - Onboarding (Beta)
            </Typography>
            <Stack direction="row" spacing={3}>
              <Button color="inherit" sx={{ textTransform: "none" }} onClick={() => navigate("/team-a")}>Team A</Button>
              <Button color="inherit" sx={{ textTransform: "none" }} onClick={() => navigate("/team-b")}>Team B</Button>
              <Button color="inherit" sx={{ textTransform: "none" }} onClick={() => navigate("/team-c")}>Team C</Button>
              <Button color="inherit" sx={{ textTransform: "none" }} onClick={() => navigate("/team-d")}>Team D</Button>
            </Stack>
          </Toolbar>
        </WidthLayout>
      </AppBar>
    </Box >
  )
}

export default Header;
