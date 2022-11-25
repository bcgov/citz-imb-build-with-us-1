import React from "react";
import ReactDOM from "react-dom/client";
import MemberList from "./MemberList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MemoryGame from "./MemoryGame";
import Header from "../../../frontend/src/Layout/Header";
import Footer from "../../../frontend/src/Layout/Footer";
import { ThemeProvider } from "@mui/material";
import theme from "../../../frontend/src/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MemberList />} />
          <Route path="/memory" element={<MemoryGame />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
