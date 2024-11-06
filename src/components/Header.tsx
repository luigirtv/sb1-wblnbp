import React from 'react';
import { Search, Sun, Moon } from 'lucide-react';
import NotificationCenter from './notifications/NotificationCenter';
import { useThemeContext } from '../context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <header className="bg-primary-bg border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-6">
      <div className="flex items-center flex-1">
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search properties, documents..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-primary-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-secondary-text" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-secondary-bg transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-secondary-text" />
          ) : (
            <Moon className="h-5 w-5 text-secondary-text" />
          )}
        </button>

        <NotificationCenter />
        
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium text-primary-text">John Doe</p>
            <p className="text-xs text-secondary-text">Real Estate Agent</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="h-8 w-8 rounded-full"
          />
        </div>
      </div>
    </header>
  );
}