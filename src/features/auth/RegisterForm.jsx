import React from 'react';
import { Form, Input, Button } from 'antd';
import { MailOutlined, UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';

const RegisterForm = ({ onFinish, loading }) => {
  return (
    <Form
      name="register"
      onFinish={onFinish}
      layout="vertical"
      requiredMark={false}
    >
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Por favor, introduce tu nombre completo' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Nombre Completo" size="large" />
      </Form.Item>

      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Por favor, introduce un nombre de usuario' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Nombre de Usuario" size="large" />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[{ required: true, type: 'email', message: 'Por favor, introduce un email válido' }]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
      </Form.Item>

      <Form.Item
        name="phone"
        rules={[{ required: false }]} // Teléfono es opcional
      >
        <Input prefix={<PhoneOutlined />} placeholder="Teléfono (Opcional)" size="large" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Por favor, introduce tu contraseña' }]}
        hasFeedback
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" size="large" />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: 'Por favor, confirma tu contraseña' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Las contraseñas no coinciden'));
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Confirmar Contraseña" size="large" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block size="large" loading={loading}>
          Registrarse
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;