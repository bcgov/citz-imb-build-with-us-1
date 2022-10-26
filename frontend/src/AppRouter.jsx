import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import TeamA from './Pages/TeamA';
import TeamB from './Pages/TeamB';
import TeamC from './Pages/TeamC';
import TeamD from './Pages/TeamD';
import Timer from './Pages/Timer';
import Footer from './Layout/Footer';
import Header from './Layout/Header';

const AppRouter = () => (
	<Router>
		<Header />
		<Routes>
			<Route path="/" index element={<HomePage />} />
			<Route path="/team-a" element={<TeamA />} />
			<Route path="/team-b" element={<TeamB />} />
			<Route path="/team-c" element={<TeamC />} />
			<Route path="/team-d" element={<TeamD />} />
      			<Route path="/timer" element={<Timer />} />
		</Routes>
		<Footer />
	</Router>
);

export default AppRouter;
