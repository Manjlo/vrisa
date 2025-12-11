import React from 'react';
import { Layout, Card, Typography, ConfigProvider, theme as antdTheme } from 'antd';
import PropTypes from 'prop-types';

const { Title } = Typography;
const { Content } = Layout;

const AuthLayout = ({ children, title }) => {
  return (
    <ConfigProvider theme={{ algorithm: antdTheme.defaultAlgorithm }}>
      <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
        <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <Card style={{ width: 400, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Title level={2} style={{ color: '#005f73' }}>VRISA</Title>
              <Title level={4} style={{ color: '#0a9396' }}>{title}</Title>
            </div>
            {children}
          </Card>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default AuthLayout;
