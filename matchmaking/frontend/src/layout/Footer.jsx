import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

const footerSX = {
  backgroundColor: "footer.main",
  color: "#fff",
  height: "6.5vh !important",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100vw",
  fontSize: "12px",
};

const Footer = () => (
  <Box sx={footerSX}>
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1048px",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
    >
      <Typography variant="h6">
        Ministry of Citizens&apos; Services, OCIO-ES, IMB
      </Typography>
      <a
        href="https://github.com/bcgov/citz-imb-build-with-us-1"
        style={{ color: "inherit" }}
      >
        <GitHubIcon />
      </a>
    </Box>
  </Box>
);

export default Footer;
