import * as React from "react";
import { Dialog, Box } from "@mui/material";
import DialogHeader from "./DialogHeader";

const CustomDialog = (props) => {
  const { onClose, open, maxHeight, bodyMargin, width, title, children } =
    props;

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxHeight: maxHeight ?? 500,
        },
      }}
    >
      <DialogHeader title={title} onClose={onClose} />
      <Box sx={{ m: bodyMargin ?? "10px", width: width ?? "300px" }}>
        {children}
      </Box>
    </Dialog>
  );
};

export default CustomDialog;
