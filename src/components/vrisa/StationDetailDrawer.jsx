// src/components/vrisa/StationDetailDrawer.jsx
import React from 'react';
import { Drawer, Descriptions, Button, Tag, Divider, Typography } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import { getHistoricalData } from '../../data/mockData';
import { getAqiInfo } from './utils/aqiHelper';

const { Title } = Typography;

const StationDetailDrawer = ({ station, visible, onClose, isMobile }) => {
  if (!station) return null;

  const historicalData = getHistoricalData(station.id);
  const aqiInfo = getAqiInfo(station.measurements.pm25, station.status);

  return (
    <Drawer
      title={<Title level={4}>{`Detalle: ${station.name}`}</Title>}
      placement={isMobile ? "bottom" : "right"}
      height={isMobile ? '90vh' : 'auto'}
      width={isMobile ? '100%' : 520}
      onClose={onClose}
      open={visible}
      extra={<Button onClick={() => alert('Descargando CSV...')}>Descargar CSV</Button>}
    >
      <Descriptions bordered column={2} size="small">
        <Descriptions.Item label="Estado AQI" span={2}>
          <Tag color={aqiInfo.color} style={{ color: aqiInfo.textColor }}>{aqiInfo.level}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="PM₂.₅">{station.measurements.pm25} µg/m³</Descriptions.Item>
        <Descriptions.Item label="PM₁₀">{station.measurements.pm10} µg/m³</Descriptions.Item>
        <Descriptions.Item label="Temp.">{station.measurements.temperature}°C</Descriptions.Item>
        <Descriptions.Item label="Humedad">{station.measurements.humidity}%</Descriptions.Item>
        <Descriptions.Item label="Última Act." span={2}>{new Date(station.lastUpdate).toLocaleString()}</Descriptions.Item>
      </Descriptions>

      <Divider>Histórico (Últimos 7 días)</Divider>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={historicalData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pm25" name="PM₂.₅" stroke="#8884d8" />
          <Line type="monotone" dataKey="pm10" name="PM₁₀" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </Drawer>
  );
};

StationDetailDrawer.propTypes = {
  station: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
};

export default StationDetailDrawer;
