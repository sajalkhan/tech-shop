import { create } from 'zustand';
type User = {
  _id: string;
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
  user: { _id: '', username: '', email: '', token: '', isLogin: false, role: '' },
  removeUser: () => set({ user: { _id: '', username: '', email: '', token: '', isLogin: false, role: '' } }),
  addUser: (user: User) =>
    set({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: user.token,
        isLogin: true,
        role: user.role,
      },
    }),
}));
