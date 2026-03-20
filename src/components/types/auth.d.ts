interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'client' | 'admin';
}

interface AuthContextType {
  user: User | null;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
}