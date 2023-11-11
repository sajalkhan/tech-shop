import { Menu, Layout } from 'antd';
import React, { useState } from 'react';
import { UserNavigationItems } from '@/constant/nav-menu';

const { Content, Sider } = Layout;

type UserNavigationProps = {
  children?: React.ReactNode;
  onClick?: (e: { key: React.Key }) => void;
};

const UserNavigation: React.FC<UserNavigationProps> = ({ children, onClick }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentTab, setCurrentTab] = useState('/user/history');

  const handleTab = (e: { key: React.Key }) => {
    (setCurrentTab as (newTab: string) => void)(e.key as string);
    onClick && onClick(e);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          mode="inline"
          onClick={handleTab}
          items={UserNavigationItems}
          style={{ height: '100%', borderRight: 0 }}
          selectedKeys={[currentTab as string]}
        />
      </Sider>

      <Layout style={{ padding: '0 24px 24px' }}>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default React.memo(UserNavigation);
