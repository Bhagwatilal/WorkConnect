import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import JobsPage from './pages/jobs/JobsPage';
import WorkersPage from './pages/workers/WorkersPage';
import Dashboard from './pages/dashboard/Dashboard';
import ProfilePage from './pages/profile/ProfilePage';
import JobForm from './pages/jobs/JobForm';
import JobEditPage from './pages/jobs/JobEditPage';
import JobApplicationPage from './pages/jobs/JobApplicationPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useJobStore } from './store/jobStore';

const App: React.FC = () => {
  const initializeJobs = useJobStore((state) => state.initializeJobs);

  useEffect(() => {
    initializeJobs();
  }, [initializeJobs]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="workers" element={<WorkersPage />} />
          <Route
            path="jobs/:jobId/apply"
            element={
              <ProtectedRoute>
                <JobApplicationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="jobs/:jobId/edit"
            element={
              <ProtectedRoute>
                <JobEditPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="jobs/new"
            element={
              <ProtectedRoute>
                <JobForm />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;