import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="bg-primary-bg rounded-lg shadow dark:shadow-gray-800 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-secondary-text">{title}</p>
          <p className="text-2xl font-semibold mt-2 text-primary-text">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-sm ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
              <span className="text-sm text-secondary-text ml-2">vs last month</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-secondary-bg rounded-full">
          <Icon className="h-6 w-6 text-accent" />
        </div>
      </div>
    </div>
  );
}