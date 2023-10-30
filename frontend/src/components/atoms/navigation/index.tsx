import React from 'react';
import { Menu } from 'antd';
import { NavigationItems } from 'constants/nav-menu';
import { useSelectedTab } from 'hooks/useSelectedTab';
import { useUserStore } from 'store/useUserStore';

type NavigationProps = {
  onClick?: (e: { key: React.Key }) => void;
};

const Navigation: React.FC<NavigationProps> = ({ onClick }) => {
  const { user } = useUserStore();
  const [currentTab, setCurrentTab] = useSelectedTab('/');

  const handleTab = (e: { key: React.Key }) => {
    (setCurrentTab as (newTab: string) => void)(e.key as string);
    onClick && onClick(e);
  };

  const updatedNavigationItems = NavigationItems?.map((item: any) => {
    if (item.key === 'username' && user.username !== '') {
      return {
        ...item,
        label: `Welcome, ${user.username}`,
        key: `Welcome, ${user.username}`,
      };
    }
    return item;
  });

  return (
    <Menu
      mode="horizontal"
      className="nav-menu"
      onClick={handleTab}
      items={updatedNavigationItems}
      selectedKeys={[currentTab as string]}
    />
  );
};

export default React.memo(Navigation);
