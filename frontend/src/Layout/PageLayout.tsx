import { Container } from '@mui/material';

const PageLayout = (props: { children: any; customHeight: any; }) => {
  return (
    <Container 
      sx={{ 
        maxWidth: "1096px", 
        width: "1096px", 
        minHeight: props.customHeight || "85vh", 
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
