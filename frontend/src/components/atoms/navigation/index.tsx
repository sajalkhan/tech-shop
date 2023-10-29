import React from 'react';
import { Menu } from 'antd';
import { NavigationItems } from 'constants/nav-menu';
import { useSelectedTab } from 'hooks/useSelectedTab';
// import { useUser } from 'context/userContext';

type NavigationProps = {
  onClick?: (e: { key: React.Key }) => void;
};

const Navigation: React.FC<NavigationProps> = ({ onClick }) => {
  // const { user } = useUser();
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

export default React.memo(Navigation);
