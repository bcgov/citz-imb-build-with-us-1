import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import LandingPage from "./pages/LandingPage";
import MemberList from "./pages/MemberList";
import useAuthService from "./services/auth/useAuthService";
import MatchingGamePage from "./pages/MatchingGamePage";

const AppRouter = () => {
  const { setUserInfo } = useAuthService();

  useEffect(() => {
    // Get the current URL and its search parameters
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    const token = searchParams.get("token");
    if (token) {
      setUserInfo(token);
      // Remove the 'paramToRemove' query parameter
      searchParams.delete("token");

      // Create a new URL with the updated search parameters
      const newUrl = `${url.origin}${
        url.pathname === "/" ? "" : url.pathname
      }${searchParams.toString()}`;

      // Update the URL without reloading the page
      window.history.pushState({}, "", newUrl);
    }
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/members" element={<MemberList />} />
        <Route path="/matching" element={<MatchingGamePage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
