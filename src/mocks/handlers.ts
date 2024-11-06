import { http, HttpResponse } from 'msw';
import { mockUsers, mockProperties } from '../tests/mocks/mockData';

export const handlers = [
  // Auth handlers
  http.post('/api/auth/login', async ({ request }) => {
    try {
      const { email, password } = await request.json();
      const user = mockUsers.find(u => u.email === email);
      
      if (user) {
        return HttpResponse.json({
          token: 'mock-jwt-token',
          user
        });
      }
      
      return new HttpResponse(null, { status: 401 });
    } catch (error) {
      return new HttpResponse(null, { status: 400 });
    }
  }),

  // User handlers
  http.get('/api/users/me', () => {
    const user = mockUsers[0];
    return HttpResponse.json(user);
  }),

  // Properties handlers
  http.get('/api/properties', () => {
    return HttpResponse.json(mockProperties);
  }),

  http.get('/api/properties/:id', ({ params }) => {
    const property = mockProperties.find(p => p.id === params.id);
    if (property) {
      return HttpResponse.json(property);
    }
    return new HttpResponse(null, { status: 404 });
  }),

  // Bookings handlers
  http.get('/api/bookings', () => {
    return HttpResponse.json([]);
  }),

  // Documents handlers
  http.get('/api/documents', () => {
    return HttpResponse.json([]);
  }),

  // Fallback handler for unhandled requests
  http.all('*', ({ request }) => {
    console.warn(`Unhandled ${request.method} request to ${request.url}`);
    return new HttpResponse(null, { status: 404 });
  })
];