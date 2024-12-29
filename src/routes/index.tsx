import React from 'react';
import { Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import JobsPage from '../pages/jobs/JobsPage';
import WorkersPage from '../pages/workers/WorkersPage';
import Dashboard from '../pages/dashboard/Dashboard';
import ProfilePage from '../pages/profile/ProfilePage';
import JobForm from '../pages/jobs/JobForm';
import JobEditPage from '../pages/jobs/JobEditPage';
import JobApplicationPage from '../pages/jobs/JobApplicationPage';
import FAQ from '../pages/FAQ';
import Contact from '../pages/Contact';
import Privacy from '../pages/Privacy';
import ProtectedRoute from '../components/auth/ProtectedRoute';

export const routes = (
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="jobs" element={<JobsPage />} />
    <Route path="workers" element={<WorkersPage />} />
    <Route path="faq" element={<FAQ />} />
    <Route path="contact" element={<Contact />} />
    <Route path="privacy" element={<Privacy />} />
    <Route path="jobs/:jobId/apply" element={<JobApplicationPage />} />
    <Route path="jobs/:jobId/edit" element={<JobEditPage />} />
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
);