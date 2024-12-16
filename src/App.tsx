import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import JobsPage from './pages/jobs/JobsPage';
import WorkersPage from './pages/workers/WorkersPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="workers" element={<WorkersPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;