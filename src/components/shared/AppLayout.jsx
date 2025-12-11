import React, { useState } from 'react';
import { Layout, Menu, Grid, Dropdown, Avatar, Space, Button, Typography } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import {
  UserOutlined,
  LogoutOutlined,
  SunOutlined,
  MoonOutlined,
} from '@ant-design/icons';
import Sidebar from 'src/components/shared/Sidebar';
import { useAuth } from 'src/contexts/AuthContext';
import { useTheme } from 'src/contexts/ThemeContext';
import ProfileModal from './ProfileModal';

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;
const { Title } = Typography;

const AppLayout = () => {
  const { user, profile, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const screens = useBreakpoint();
  const isMobile = !screens.lg;
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  const handleProfileClick = () => {
    setProfileModalVisible(true);
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />} onClick={handleProfileClick}>
        Perfil
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
        Cerrar sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Title level={3} style={{ color: 'inherit', margin: 0 }}>
            VRISA App
          </Title>
          <Space>
            <Button onClick={toggleTheme} icon={theme === 'light' ? <MoonOutlined /> : <SunOutlined />} />
            {user ? (
              <Dropdown overlay={userMenu} placement="bottomRight">
                <Avatar style={{ cursor: 'pointer' }} src={profile?.avatar_url} icon={<UserOutlined />} />
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
          <Content style={{ padding: '24px', height: 'calc(100vh - 64px)', overflow: 'auto' }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      {user && (
        <ProfileModal
          visible={profileModalVisible}
          onClose={() => setProfileModalVisible(false)}
        />
      )}
    </>
  );
};

export default AppLayout;
