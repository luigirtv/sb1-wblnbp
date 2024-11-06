import React from 'react';
import { useAuth } from '../context/AuthContext';
import OwnerDashboard from '../components/dashboard/OwnerDashboard';
import AgentDashboard from '../components/dashboard/AgentDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  return user.role === 'owner' ? <OwnerDashboard /> : <AgentDashboard />;
}