import React from "react";
import ReactDOM from "react-dom/client";
import MemberList from "./pages/MemberList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemoryGame from "./pages/MemoryGame";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import './css/common.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MemberList />} />
          <Route path="/memory" element={<MemoryGame />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
