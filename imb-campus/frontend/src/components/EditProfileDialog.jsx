import * as React from "react";
import { Box, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import useAuthService from "../services/auth/useAuthService";
import ProfileAvatar from "./ProfileAvatar";
import { CustomDialog, DialogButton } from "./CustomDialog";

const EditProfileDialog = (props) => {
  const { state: authState } = useAuthService();
  const { onClose, open } = props;
  const user = authState.userInfo;

  const handleClose = () => {
    onClose();
  };

  return (
    <CustomDialog
      onClose={handleClose}
      open={open}
      maxHeight={500}
      bodyMargin="10px"
      width="300px"
      title="Profile Photo"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ProfileAvatar size="large" />
      </Box>
      <Grid
        container
        spacing={1}
        sx={{
          marginTop: "20px",
          marginBottom: "40px",
          paddingRight: "15%",
          paddingLeft: "15%",
        }}
      >
        <Grid item xs={6}>
          <DialogButton
            color="primary"
            label="Upload photo"
            icon={
              <AddPhotoAlternateIcon
                sx={{
                  color: "black",
                  fontSize: "32px",
                }}
              />
            }
            onClick={() => {
              // TODO: handle upload picture click
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <DialogButton
            color="primary"
            label="Remove photo"
            icon={
              <DeleteIcon
                sx={{
                  color: "black",
                  fontSize: "32px",
                }}
              />
            }
            onClick={() => {
              // TODO: handle delete picture click
            }}
          />
        </Grid>
      </Grid>
    </CustomDialog>
  );
};

export default EditProfileDialog;
