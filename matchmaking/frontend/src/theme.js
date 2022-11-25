import { createTheme } from "@mui/material/styles";

const themeConfig = {
    palette: {
        header: {
            main: "#ffffff",
            border: "#ebebeb",
        },
        footer: {
            main: "#3c3c3c",
        },
        fontColor: {
            white: "#fff",
            black: "#000"
        }
    },
}

const theme = createTheme(themeConfig)

export default theme;