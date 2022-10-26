import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import TeamA from './Pages/TeamA';
import TeamB from './Pages/TeamB';
import TeamC from './Pages/TeamC';
import LeaderboardPage from './Pages/LeaderboardPage';
import Timer from './Pages/Timer';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/team-a" element={<TeamA />} />
      <Route path="/team-b" element={<TeamB />} />
      <Route path="/team-c" element={<TeamC />} />
      <Route path="/team-d" element={<LeaderboardPage />} />
      <Route path="/timer" element={<Timer />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default AppRouter;
