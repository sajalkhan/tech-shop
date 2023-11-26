import type { MenuProps } from 'antd';
import {
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  HistoryOutlined,
  HeartOutlined,
  HomeOutlined,
} from '@ant-design/icons';

import { MdProductionQuantityLimits } from 'react-icons/md';
import { TbBrandProducthunt, TbCategoryMinus } from 'react-icons/tb';
import { BiCategory } from 'react-icons/bi';
import { RiCoupon3Line, RiLockPasswordLine } from 'react-icons/ri';

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
        label: 'Dashboard',
        key: '/user',
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
    icon: <RiLockPasswordLine />,
  },
  {
    label: 'WishList',
    key: '/user/wishlist',
    icon: <HeartOutlined rev={undefined} />,
  },
];

export const AdminNavigationItems: MenuProps['items'] = [
  {
    label: 'Product',
    key: '/admin/product',
    icon: <MdProductionQuantityLimits />,
  },
  {
    label: 'Products',
    key: '/admin/products',
    icon: <TbBrandProducthunt />,
  },
  {
    label: 'Category',
    key: '/admin/category',
    icon: <BiCategory />,
  },
  {
    label: 'Sub Category',
    key: '/admin/sub',
    icon: <TbCategoryMinus />,
  },
  {
    label: 'Coupon',
    key: '/admin/coupon',
    icon: <RiCoupon3Line />,
  },
  {
    label: 'Update Password',
    key: '/user/password',
    icon: <RiLockPasswordLine />,
  },
];
