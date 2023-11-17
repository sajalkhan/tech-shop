import type { MenuProps } from 'antd';
import {
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  HistoryOutlined,
  EditOutlined,
  HeartOutlined,
  HomeOutlined,
} from '@ant-design/icons';

export const NavigationItems: MenuProps['items'] = [
  {
    label: 'Home',
    key: '/',
    icon: <HomeOutlined rev={undefined} />,
  },
  {
    label: 'Shop',
    key: '/shop',
    icon: <ShoppingOutlined rev={undefined} />,
  },
  {
    label: 'Cart',
    key: '/key',
    icon: <ShoppingCartOutlined rev={undefined} />,
  },
  {
    label: 'Register',
    key: '/register',
    icon: <UserAddOutlined rev={undefined} />,
    className: 'float-right',
  },
  {
    label: 'login',
    key: '/login',
    icon: <UserOutlined rev={undefined} />,
    className: 'float-right',
  },
  {
    label: 'userinfo',
    key: '/userinfo',
    icon: <SettingOutlined rev={undefined} />,
    className: 'float-right',
    children: [
      {
        label: 'Option 1',
        key: 'setting:1',
      },
      {
        label: 'Logout',
        key: 'logout',
        icon: <LogoutOutlined rev={undefined} />,
      },
    ],
  },
];

export const UserNavigationItems: MenuProps['items'] = [
  {
    label: 'History',
    key: '/user/history',
    icon: <HistoryOutlined rev={undefined} />,
  },
  {
    label: 'Update Password',
    key: '/user/password',
    icon: <EditOutlined rev={undefined} />,
  },
  {
    label: 'WishList',
    key: '/user/wishlist',
    icon: <HeartOutlined rev={undefined} />,
  },
];
