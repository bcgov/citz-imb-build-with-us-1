import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Logout, Menu as MenuIcon } from "@mui/icons-material";
import BCGovLogo from "../../public/BCGovLogo.png";
import { useAuth } from "../providers/AuthProvider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Avatar from "@mui/material/Avatar";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      height: "35px",
      width: "35px",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const Header = (props) => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUserDropdown, setAnchorElUserDropdown] = useState(null);

  const user = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLinkClick = (link) => () => {
    navigate(link);
  };

  return (
    <Box
      sx={{
        border: "solid",
        borderColor: "header.border",
        borderWidth: "0px 0px 0.3vh 0px",
        minHeight: "6.5vh",
      }}
    >
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{
          maxWidth: "1096px",
          margin: "auto",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "header.border",
                borderRadius: "10px",
                height: "50px !important",
                width: "50px !important",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 0,
                marginRight: "1rem",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              <img
                src={BCGovLogo}
                style={{ maxHeight: "23px" }}
                alt="Logo for the Government of British Columbia"
              />
            </Box>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", flexGrow: 1 }}
            >
              IMB Onboarding(Beta)
            </Typography>
            {user ? (
              <>
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
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem onClick={handleLinkClick("/journey")}>
                    <Typography textAlign="center">My Journey</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLinkClick("/dashboard")}>
                    <Typography textAlign="center">Dashboard</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLinkClick("/leaderboard")}>
                    <Typography textAlign="center">Leaderboard</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLinkClick("/profile")}>
                    <Typography textAlign="center">
                      {user.given_name}
                      &nbsp;
                      {user.family_name}
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              ""
            )}
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "header.border",
                borderRadius: "10px",
                height: "50px",
                width: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 0,
                marginRight: "1rem",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              <img
                src="/BCGovLogo.png"
                style={{ maxHeight: "23px" }}
                alt="Logo for the Government of British Columbia"
              />
            </Box>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", flexGrow: 1 }}
            >
              IMB Onboarding(Beta)
            </Typography>
            {user ? (
              <Stack direction="row" spacing={3}>
                <Button
                  color="inherit"
                  sx={{ textTransform: "none" }}
                  onClick={handleLinkClick("/journey")}
                >
                  My&nbsp;Journey
                </Button>
                <Button
                  color="inherit"
                  sx={{ textTransform: "none" }}
                  onClick={handleLinkClick("/dashboard")}
                >
                  Dashboard
                </Button>
                <Button
                  color="inherit"
                  sx={{ textTransform: "none" }}
                  onClick={handleLinkClick("/leaderboard")}
                >
                  Leaderboard
                </Button>
                <Button
                  color="inherit"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "transparent !important",
                  }}
                  onClick={(e) => setAnchorElUserDropdown(e.currentTarget)}
                  endIcon={<KeyboardArrowDownIcon />}
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                >
                  <Avatar
                    {...stringAvatar(user.given_name + " " + user.family_name)}
                  />
                  &nbsp; &nbsp;
                  {user.given_name}
                  &nbsp;
                  {user.family_name}
                </Button>
              </Stack>
            ) : (
              ""
            )}
            <Menu
              anchorEl={anchorElUserDropdown}
              open={!!anchorElUserDropdown}
              onClose={() => {
                setAnchorElUserDropdown(null);
              }}
              anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            >
              <MenuItem onClick={handleLinkClick("/profile")}>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLinkClick("/logout")}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
