import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ApiErrorMessageProps {
  error: string;
  className?: string;
}

export default function ApiErrorMessage({ error, className = '' }: ApiErrorMessageProps) {
  return (
    <div className={`flex items-center p-4 bg-red-50 border border-red-200 rounded-lg ${className}`}>
      <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
      <p className="text-sm text-red-700">{error}</p>
    </div>
  );
}