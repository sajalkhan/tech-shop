import { create } from 'zustand';
type User = {
  token?: string;
  email: string;
  role: string;
  isLogin: boolean;
  username: string;
};

type UserStore = {
  user: User;
  removeUser: () => void;
  addUser: (user: User) => void;
};

export const useUserStore = create<UserStore>(set => ({
  user: { username: '', email: '', token: '', isLogin: false, role: '' },
  removeUser: () => set({ user: { username: '', email: '', token: '', isLogin: false, role: '' } }),
  addUser: (user: User) =>
    set({ user: { username: user.username, email: user.email, token: user.token, isLogin: true, role: user.role } }),
}));
