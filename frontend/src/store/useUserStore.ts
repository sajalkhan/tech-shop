import { create } from 'zustand';
type User = {
  token?: string;
  email: string;
  isLogin: boolean;
  username: string;
};

type UserStore = {
  user: User;
  removeUser: () => void;
  addUser: (user: User) => void;
};

export const useUserStore = create<UserStore>(set => ({
  user: { username: '', email: '', token: '', isLogin: false },
  removeUser: () => set({ user: { username: '', email: '', token: '', isLogin: false } }),
  addUser: (user: User) =>
    set({ user: { username: user.username, email: user.email, token: user.token, isLogin: true } }),
}));
