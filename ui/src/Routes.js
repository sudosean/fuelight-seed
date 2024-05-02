import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Scenarios from './views/Scenarios/Scenarios';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Scenarios />} exact />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
