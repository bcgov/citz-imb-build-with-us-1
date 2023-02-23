import * as React from "react";
import { Dialog, DialogTitle, Button, Typography, Stack } from "@mui/material";

const EditProfileDialog = (props) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Profile Photo</DialogTitle>
      <Stack spacing={2}>
        <Typography>Test</Typography>
      </Stack>
    </Dialog>
  );
};

export default EditProfileDialog;

