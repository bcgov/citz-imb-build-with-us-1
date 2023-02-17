import { Container } from "@mui/material";
import React from "react";

const PageLayout = (props) => (
  <Container
    sx={{
      width: "1096px !important",
      minHeight: props.customHeight || "86.8vh",
      display: "flex",
      justifyContent: "center",
    }}
  >
    {props.children}
  </Container>
);

export default PageLayout;
