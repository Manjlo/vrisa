import React, { useState, useEffect } from 'react';
import { Avatar, Upload, Button, message, Spin } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { useAuth } from 'src/contexts/AuthContext';
import { uploadFile } from 'src/services/storageService';

const AvatarUpload = ({ value, onChange }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(value);

  // Update internal state if the value from the form changes
  useEffect(() => {
    setAvatarUrl(value);
  }, [value]);

  const handleUpload = async (options) => {
    const { file } = options;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    setLoading(true);
    try {
      const publicUrl = await uploadFile('avatars', filePath, file);
      setAvatarUrl(publicUrl); // Update the displayed avatar immediately
      onChange(publicUrl);   // Notify the form of the change
      message.success('Avatar subido. Haz clic en "Actualizar" para guardar los cambios.');
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      {loading ? <Spin /> : <Avatar size={128} src={avatarUrl} icon={<UserOutlined />} />}
      <Upload
        customRequest={handleUpload}
        showUploadList={false}
        beforeUpload={(file) => {
          const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
          if (!isJpgOrPng) {
            message.error('¡Solo puedes subir archivos JPG/PNG!');
          }
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isLt2M) {
            message.error('¡La imagen debe ser más pequeña que 2MB!');
          }
          return isJpgOrPng && isLt2M;
        }}
      >
        <Button icon={<UploadOutlined />}>Cambiar Avatar</Button>
      </Upload>
    </div>
  );
};

export default AvatarUpload;