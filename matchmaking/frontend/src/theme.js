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
        },
    },
    typography: {
        fontFamily: [
            'BCSans'
        ]
    }
}

const theme = createTheme(themeConfig)

export default theme;