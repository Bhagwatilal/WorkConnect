import React from 'react';
import { useAuthStore } from '../../store/authStore';
import OwnerDashboard from './OwnerDashboard';
import WorkerDashboard from './WorkerDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      {user.role === 'owner' ? <OwnerDashboard /> : <WorkerDashboard />}
    </div>
  );
};

export default Dashboard;