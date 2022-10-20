import React from "react";
import AppRouter from "./AppRouter";
import { Box, ThemeProvider } from "@mui/material";
import theme from "../theme";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";

const App = () => {

    return (
        <ThemeProvider theme={theme}>
            <AppRouter />
        </ThemeProvider>

    )
}

export default App
