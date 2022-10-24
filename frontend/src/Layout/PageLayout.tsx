import { Container } from '@mui/material';
import React from 'react';

const PageLayout = (props: { children: any; customHeight: any; }) => {
  return (
    <Container 
      sx={{ 
        maxWidth: "1096px !important", 
        minHeight: props.customHeight || "86.8vh", //86.8vh comes from 6.5vh for header, 6.5vh for footer, .2vh for header border
        paddingLeft: "2rem", 
        paddingRight: "2rem", 
        display: "flex", 
        justifyContent: "center",
      }}
    >
      {props.children}
    </Container>
  )
};

export default PageLayout;
