import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Spin, Alert, message } from 'antd';
import { useAuth } from 'src/contexts/AuthContext';
import { getProfile, updateProfile } from 'src/services/usuarioService';
import AvatarUpload from './AvatarUpload';

const ProfileModal = ({ visible, onClose }) => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (visible && user) {
      setLoading(true);
      setError(null);
      getProfile(user.id)
        .then(profile => {
          setProfileData(profile);
          form.setFieldsValue(profile);
        })
        .catch(err => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [visible, user, form]);

  const handleUpdate = async (values) => {
    setLoading(true);
    setError(null);
    try {
      await updateProfile(user.id, values);
      message.success('Perfil actualizado correctamente');
      onClose();
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAvatarChange = (newUrl) => {
    form.setFieldsValue({ avatar_url: newUrl });
  };

  return (
    <Modal
      title="Mi Perfil"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={() => form.submit()}>
          Actualizar
        </Button>,
      ]}
    >
      {loading && !error && <div style={{ textAlign: 'center' }}><Spin /></div>}
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 24 }} />}
      {!loading && profileData && (
        <Form form={form} layout="vertical" onFinish={handleUpdate} initialValues={profileData}>
          <Form.Item name="avatar_url">
            <AvatarUpload value={profileData.avatar_url} onChange={handleAvatarChange} />
          </Form.Item>
          <Form.Item name="nombre_usuario" label="Nombre de Usuario">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input disabled />
          </Form.Item>
          <Form.Item name="telefono" label="Teléfono">
            <Input />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default ProfileModal;