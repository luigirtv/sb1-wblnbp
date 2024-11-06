import React from 'react';
import { useAuth } from '../context/AuthContext';
import OwnerBookings from '../components/bookings/OwnerBookings';
import AgentBookings from '../components/bookings/AgentBookings';

export default function Bookings() {
  const { user } = useAuth();

  if (!user) return null;

  return user.role === 'owner' ? <OwnerBookings /> : <AgentBookings />;
}