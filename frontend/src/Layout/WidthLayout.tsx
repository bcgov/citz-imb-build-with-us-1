import { Container } from '@mui/system';

const WidthLayout = (props: { children: any; }) => {
  return (
    <Container sx={{ maxWidth: "1096px", width: "1096px", }}>
      {props.children}
    </Container>
  )
};

export default WidthLayout;
