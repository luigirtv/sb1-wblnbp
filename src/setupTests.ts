import '@testing-library/jest-dom';
import { server } from './mocks/server';
import { cleanup } from '@testing-library/react';

// Configuration du serveur MSW avant tous les tests
beforeAll(() => server.listen());

// Reset des handlers après chaque test
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

// Nettoyage après tous les tests
afterAll(() => server.close());

// Mock de window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock de ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};