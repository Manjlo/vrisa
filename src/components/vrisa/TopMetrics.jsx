// src/components/vrisa/TopMetrics.jsx
import React from 'react';
import { Row, Col, Card, Statistic, Tag } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, WifiOutlined, DisconnectOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { getAqiInfo } from './utils/aqiHelper';

const TopMetrics = ({ stations }) => {
  const onlineStations = stations.filter(s => s.status === 'online');
  
  const avgPm25 = onlineStations.length > 0 
    ? onlineStations.reduce((acc, s) => acc + s.measurements.pm25, 0) / onlineStations.length
    : 0;

  const worstStation = [...onlineStations].sort((a, b) => b.measurements.pm25 - a.measurements.pm25)[0];
  const avgAqiInfo = getAqiInfo(avgPm25, 'online');

  return (
    <Row gutter={[16, 16]}>
      <Col xs={12} sm={12} lg={6}>
        <Card>
          <Statistic
            title="PM₂.₅ Promedio"
            value={avgPm25.toFixed(1)}
            precision={1}
            valueStyle={{ color: avgAqiInfo.color, fontWeight: 'bold' }}
            prefix={avgPm25 > 35 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="µg/m³"
          />
        </Card>
      </Col>
      <Col xs={12} sm={12} lg={6}>
        <Card>
          <Statistic title="Estaciones" value={onlineStations.length} suffix={`/ ${stations.length}`} prefix={<WifiOutlined />} />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Peor Estación"
            value={worstStation?.name || 'N/A'}
            valueStyle={{ fontSize: '1.1em' }}
          />
          {worstStation && (
            <Tag color={getAqiInfo(worstStation.measurements.pm25, 'online').color}>
              PM₂.₅: {worstStation.measurements.pm25.toFixed(1)}
            </Tag>
          )}
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic title="Alerta Reciente" value="Ninguna" />
          <Tag color="green">Sin novedad</Tag>
        </Card>
      </Col>
    </Row>
  );
};

TopMetrics.propTypes = {
  stations: PropTypes.array.isRequired,
};

export default TopMetrics;
