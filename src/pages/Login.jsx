import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import LoginForm from 'src/features/auth/LoginForm';
import AuthLayout from 'src/components/shared/AuthLayout';

const { Text } = Typography;

const Login = () => {
  return (
    <AuthLayout title="Iniciar Sesión">
      <LoginForm />
      <Text style={{ marginTop: '1rem', display: 'block', textAlign: 'center' }}>
        ¿No tienes una cuenta? <Link to="/register">¡Regístrate ahora!</Link>
      </Text>
    </AuthLayout>
  );
};

export default Login;