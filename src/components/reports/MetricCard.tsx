import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  trend: number;
  icon: LucideIcon;
  description: string;
}

export default function MetricCard({
  title,
  value,
  trend,
  icon: Icon,
  description
}: MetricCardProps) {
  const isPositive = trend >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold mt-2">{value}</p>
        </div>
        <div className="p-3 bg-blue-50 rounded-full">
          <Icon className="h-6 w-6 text-blue-500" />
        </div>
      </div>
      <div className="flex items-center mt-4">
        <div
          className={`flex items-center ${
            isPositive ? 'text-green-500' : 'text-red-500'
          }`}
        >
          <TrendIcon className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">
            {isPositive ? '+' : ''}{trend}%
          </span>
        </div>
        <span className="text-sm text-gray-500 ml-2">{description}</span>
      </div>
    </div>
  );
}