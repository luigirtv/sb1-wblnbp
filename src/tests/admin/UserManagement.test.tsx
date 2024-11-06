import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserManagement from '../../components/admin/UserManagement';
import { userService } from '../../services/api/users';

jest.mock('../../services/api/users');

const mockUsers = [
  {
    id: '1',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'owner',
    createdAt: new Date(),
    lastLogin: new Date()
  },
  {
    id: '2',
    email: 'jane@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'agent',
    createdAt: new Date(),
    lastLogin: new Date()
  }
];

describe('UserManagement', () => {
  beforeEach(() => {
    (userService.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);
  });

  it('renders user list', async () => {
    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('filters users by search query', async () => {
    render(<UserManagement />);

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Rechercher...');
      fireEvent.change(searchInput, { target: { value: 'John' } });
    });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });
});