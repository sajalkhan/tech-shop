import type { MenuProps } from 'antd';
import { AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons';

export const NavigationItems: MenuProps['items'] = [
  {
    label: 'Home',
    key: '/',
    icon: <AppstoreOutlined rev={undefined} />,
  },
  {
    label: 'Register',
    key: 'register',
    icon: <UserAddOutlined rev={undefined} />,
    className: 'float-right',
  },
  {
    label: 'login',
    key: 'login',
    icon: <UserOutlined rev={undefined} />,
    className: 'float-right',
  },
  {
    label: 'userName',
    key: 'username',
    icon: <SettingOutlined rev={undefined} />,
    children: [
      {
        label: 'Option 1',
        key: 'setting:1',
      },
      {
        label: 'Option 2',
        key: 'setting:2',
      },
    ],
  },
];
