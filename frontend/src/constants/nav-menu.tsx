import type { MenuProps } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

export const NavigationItems: MenuProps['items'] = [
  {
    label: 'Home',
    key: '/',
    icon: <AppstoreOutlined rev={undefined} />,
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
