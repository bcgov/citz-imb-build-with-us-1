import * as React from "react";
import {
  Dialog,
  DialogTitle,
  Avatar,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import useAuthService from "../services/auth/useAuthService";

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

const EditProfileDialog = (props) => {
  const { state: authState } = useAuthService();
  const { onClose, selectedValue, open } = props;
  const user = authState.userInfo;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        <Typography>Profile Photo</Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Avatar
        sx={{ align: "center" }}
        alt="Profile Photo"
        {...stringAvatar(user?.given_name + " " + user?.family_name)}
      />
      <Stack spacing={2} sx={{ paddingRight: "10px", paddingLeft: "10px" }}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <AddPhotoAlternateIcon />
        </IconButton>
        <Typography>Upload photo</Typography>
      </Stack>
      <Stack spacing={2} sx={{ paddingRight: "10px", paddingLeft: "10px" }}>
        <IconButton
          color="primary"
          aria-label="delete picture"
          component="label"
        >
          <DeleteIcon />
        </IconButton>
        <Typography>Delete</Typography>
      </Stack>
    </Dialog>
  );
};

export default EditProfileDialog;

