import React from "react";
import ReactDOM from "react-dom/client";
import MemberList from "./pages/MemberList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemoryGame from "./pages/MemoryGame";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import "./css/common.css";
import { AuthProvider } from "./providers/AuthProvider";
import LandingPage from "./pages/LandingPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/members" element={<MemberList />} />
            <Route path="/memory" element={<MemoryGame />} />
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
