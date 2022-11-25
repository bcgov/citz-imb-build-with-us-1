import React from "react";
import ReactDOM from "react-dom/client";
import MemberList from "./pages/MemberList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MemoryGame from "./MemoryGame";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

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
