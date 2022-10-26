import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import MemberList from './Pages/MemberList';
import TeamA from './Pages/TeamA';
import TeamB from './Pages/TeamB';
import TeamC from './Pages/TeamC';
import TeamD from './Pages/TeamD';
import Timer from './Pages/Timer';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/team-a" element={<TeamA />} />
      <Route path="/team-b" element={<TeamB />} />
      <Route path="/team-c" element={<TeamC />} />
      <Route path="/team-d" element={<TeamD />} />
			<Route path="/member-list" element={<MemberList />} />
      <Route path="/timer" element={<Timer />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default AppRouter;
