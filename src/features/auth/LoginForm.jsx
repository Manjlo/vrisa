import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from 'src/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    setError(null);
    try {
      await login(values);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="login"
      onFinish={onFinish}
      layout="vertical"
      requiredMark={false}
    >
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 24 }} />}
      
      <Form.Item
        name="email"
        rules={[{ required: true, type: 'email', message: 'Por favor, introduce tu email' }]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Por favor, introduce tu contraseña' }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" size="large" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block size="large" loading={loading}>
          Iniciar Sesión
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;