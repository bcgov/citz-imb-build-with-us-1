import AppRouter from "./AppRouter";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  )
};

export default App;
