import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Alert } from 'antd';
import RegisterForm from 'src/features/auth/RegisterForm';
import AuthLayout from 'src/components/shared/AuthLayout';
import { supabase } from 'src/api/supabaseClient';

const { Text } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.name,
            username: values.username,
            phone: values.phone,
          },
        },
      });

      if (error) {
        throw error;
      }
      
      // You might want to show a message to check email for confirmation
      navigate('/login');

    } catch (err) {
      console.error('Supabase registration error:', err);
      setError(`Error: ${err.message}. Status: ${err.status || 'N/A'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Crear Cuenta">
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 24 }} />}
      <RegisterForm onFinish={handleRegister} loading={loading} />
      <Text style={{ marginTop: '1rem', display: 'block', textAlign: 'center' }}>
        ¿Ya tienes una cuenta? <Link to="/login">¡Inicia sesión!</Link>
      </Text>
    </AuthLayout>
  );
};

export default Register;