import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import "./css/common.css";
import AuthProvider from "./providers/AuthProvider";
import UserProvider from "./providers/UserProvider";
import AppRouter from "./AppRouter";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </AuthProvider>
    </UserProvider>
  </React.StrictMode>
);
