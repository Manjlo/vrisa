import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Form, Input, Button, Typography, Card } from 'antd';
import { MailOutlined, UserOutlined, PhoneOutlined, LockOutlined } from '@ant-design/icons';
import '../styles/global.css';

const { Content } = Layout;
const { Title, Text } = Typography;

const Register = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // Handle registration logic here
  };

  return (
    <Layout style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
        <Card style={{ width: 400, textAlign: 'center' }} className="card--glass">
          <Title level={2} style={{ color: 'var(--color-text)', marginBottom: '2rem' }}>
            Create Account
          </Title>
          <Form
            name="register"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Name" size="large" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Phone" size="large" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
              hasFeedback
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" size="large" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Register
              </Button>
            </Form.Item>
          </Form>
          <Text style={{ marginTop: '1rem', display: 'block' }}>
            Already have an account? <Link to="/login">Log in!</Link>
          </Text>
        </Card>
      </Content>
    </Layout>
  );
};

export default Register;m>

            <Form.Item
              name="phone"
              rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Phone" size="large" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
              hasFeedback
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" size="large" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default Register;
