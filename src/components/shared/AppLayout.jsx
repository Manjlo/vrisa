import React, { useState } from 'react';
import { Layout, Menu, Grid, Dropdown, Avatar, Space, Button, Typography } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import {
  UserOutlined,
  DashboardOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import Sidebar from 'src/components/shared/Sidebar';
import { useAuth } from 'src/hooks/useAuth';

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;
const { Title } = Typography;

const AppLayout = () => {
  const { user, logout } = useAuth();
  const screens = useBreakpoint();
  const isMobile = !screens.lg;

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Perfil
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
        Cerrar sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Title level={3} style={{ color: '#005f73', margin: 0 }}>
          VRISA App
        </Title>
        <Space>
          {user ? (
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Avatar style={{ cursor: 'pointer' }} icon={<UserOutlined />} />
            </Dropdown>
          ) : (
            <Button type="primary">
              <Link to="/login">Iniciar sesión</Link>
            </Button>
          )}
        </Space>
      </Header>
      <Layout>
        {!isMobile && <Sidebar />}
        <Content style={{ padding: '24px', background: '#f0f2f5', height: 'calc(100vh - 64px)', overflow: 'auto' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
