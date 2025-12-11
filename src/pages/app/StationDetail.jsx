import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Row, Col, Statistic, Spin, Alert, Typography, Table, Tag } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useStationHistory } from 'src/hooks/useStationHistory';
import { useStations } from 'src/hooks/useStations';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { format } from 'date-fns';

const { Title, Text } = Typography;

const StationDetail = () => {
  const { id } = useParams();
  const { history, loading: historyLoading, error: historyError } = useStationHistory(id);
  const { stations, loading: stationsLoading } = useStations();

  if (stationsLoading) return <Spin tip="Cargando información de la estación..." />;

  const station = stations.find(s => s.id === parseInt(id));

  if (!station) {
    return <Alert message="Error" description="Estación no encontrada." type="error" showIcon />;
  }

  const chartData = history.map(d => ({
    ...d,
    fecha_medicion: format(new Date(d.fecha_medicion), 'MMM d, HH:mm'),
  }));

  const columns = [
    { title: 'Fecha', dataIndex: 'fecha_medicion', key: 'fecha', render: (date) => format(new Date(date), 'yyyy-MM-dd HH:mm:ss') },
    { title: 'PM₂.₅', dataIndex: 'pm25_ugm3', key: 'pm25' },
    { title: 'PM₁₀', dataIndex: 'pm10_ugm3', key: 'pm10' },
    { title: 'Temp (°C)', dataIndex: 'temp_c', key: 'temp' },
    { title: 'Humedad (%)', dataIndex: 'hum_pct', key: 'hum' },
  ];

  return (
    <div>
      <Link to="/stations" style={{ marginBottom: 16, display: 'inline-block' }}>
        <ArrowLeftOutlined /> Volver a la lista
      </Link>
      <Title level={2}>{station.name}</Title>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}><Statistic title="Latitud" value={station.lat} precision={4} /></Col>
        <Col xs={12} sm={6}><Statistic title="Longitud" value={station.lng} precision={4} /></Col>
        <Col xs={12} sm={6}><Statistic title="Estado" value={station.status} formatter={(value) => <Tag color={value?.trim().toLowerCase() === 'online' ? 'green' : 'red'}>{value}</Tag>} /></Col>
      </Row>

      <Card title="Historial de PM₂.₅">
        {historyLoading && <Spin />}
        {historyError && <Alert message="Error al cargar historial" description={historyError} type="error" />}
        {!historyLoading && !historyError && (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha_medicion" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pm25_ugm3" name="PM₂.₅ (µg/m³)" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Card>

      <Card title="Tabla de Mediciones Históricas" style={{ marginTop: 24 }}>
        <Table
          dataSource={history}
          columns={columns}
          rowKey="fecha_medicion"
          loading={historyLoading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default StationDetail;