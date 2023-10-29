import { createContext, useContext, useState } from 'react';
import { User } from 'constants/types';

type UserContextType = {
  user: User;
  updateUser: (userData: User) => void;
};

type UserProviderProps = {
  children: React.ReactNode;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<any>(null);

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  return <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>;
}
