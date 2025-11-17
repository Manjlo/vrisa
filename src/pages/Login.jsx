import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Card, Typography } from 'antd';
import LoginForm from 'src/features/auth/LoginForm';
import '../styles/global.css';

const { Content } = Layout;
const { Title, Text } = Typography;

const Login = () => {
  return (
    <Layout style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
        <Card style={{ width: 400, textAlign: 'center' }} className="card--custom">
          <Title level={2} style={{ color: 'var(--color-text)', marginBottom: '2rem' }}>
            Login
          </Title>
          <LoginForm />
          <Text style={{ marginTop: '1rem', display: 'block' }}>
            Don't have an account? <Link to="/register">Register now!</Link>
          </Text>
        </Card>
      </Content>
    </Layout>
  );
};

export default Login;
