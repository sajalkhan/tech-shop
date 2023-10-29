import React from 'react';
import { Menu } from 'antd';
import { NavigationItems } from '@root/libs/nav-menu';
import { useSelectedTab } from '@root/hooks/useSelectedTab';

type NavigationProps = {
  onClick?: (e: { key: React.Key }) => void;
};

const Navigation: React.FC<NavigationProps> = ({ onClick }) => {
  const [currentTab, setCurrentTab] = useSelectedTab('/');

  const handleTab = (e: { key: React.Key }) => {
    (setCurrentTab as (newTab: string) => void)(e.key as string);
    onClick && onClick(e);
  };

  return (
    <Menu
      mode="horizontal"
      className="nav-menu"
      onClick={handleTab}
      items={NavigationItems}
      selectedKeys={[currentTab as string]}
    />
  );
};

export default Navigation;
