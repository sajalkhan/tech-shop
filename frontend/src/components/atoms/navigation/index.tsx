import React, { useState } from 'react';
import { Menu } from 'antd';
import { NavigationItems } from '@root/libs/nav-menu';

type NavigationProps = {
  onClick?: (e: { key: React.Key }) => void;
};

const Navigation: React.FC<NavigationProps> = ({ onClick }) => {
  const [currentTab, setCurrentTab] = useState('/');

  const handleTab = (e: { key: React.Key }) => {
    setCurrentTab(e.key as string);
    onClick && onClick(e);
  };

  return (
    <Menu
      mode="horizontal"
      className="nav-menu"
      onClick={handleTab}
      items={NavigationItems}
      selectedKeys={[currentTab]}
    />
  );
};

export default Navigation;
