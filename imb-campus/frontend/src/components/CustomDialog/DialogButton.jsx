import * as React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";

const DialogButton = (props) => {
  const { icon, label, color, onClick } = props;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <IconButton
        color={color}
        aria-label={label}
        component="label"
        onClick={onClick}
      >
        <Box sx={{ width: "50px", height: "50px" }}>
          <Stack
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>{icon}</Box>
            <Typography sx={{ fontSize: "12px" }}>{label}</Typography>
          </Stack>
        </Box>
      </IconButton>
    </Box>
  );
};

export default DialogButton;

