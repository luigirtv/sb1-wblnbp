import React from 'react';
import { useAuth } from '../context/AuthContext';
import OwnerProperties from '../components/properties/OwnerProperties';
import AgentProperties from '../components/properties/AgentProperties';

export default function Properties() {
  const { user } = useAuth();

  if (!user) return null;

  return user.role === 'owner' ? <OwnerProperties /> : <AgentProperties />;
}