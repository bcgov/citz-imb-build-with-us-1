import React from 'react'
import HomePage from './Pages/HomePage'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";


const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
    )
}

export default AppRouter