import React, { useState } from 'react';
import { Table, Tag, Input, Select, Space, Card, Typography, Spin, Alert, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useStations } from 'src/hooks/useStations';
import { getAqiInfo } from 'src/components/vrisa/utils/aqiHelper';

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

const StationsListPage = () => {
  const { stations, loading, error } = useStations();
  const [searchText, setSearchText] = useState('');
  const [aqiFilter, setAqiFilter] = useState('all');
  const navigate = useNavigate();

  if (loading) return <Spin tip="Cargando estaciones..." />;
  if (error) return <Alert message="Error al cargar estaciones" description={error} type="error" showIcon />;

  const filteredStations = stations
    .filter((s) => s?.name?.toLowerCase().includes(searchText.toLowerCase()))
    .filter((s) => {
      if (aqiFilter === 'all') return true;
      const { level } = getAqiInfo(s.measurements.pm25);
      return level === aqiFilter;
    });

  const columns = [
    {
      title: 'Nombre de la Estación',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'PM₂.₅ (µg/m³)',
      dataIndex: 'measurements',
      key: 'pm25',
      align: 'center',
      sorter: (a, b) => (a.measurements?.pm25 ?? -1) - (b.measurements?.pm25 ?? -1),
      render: (measurements) => {
        const pm25 = measurements?.pm25;
        return typeof pm25 === 'number' ? pm25.toFixed(1) : <Text type="secondary">N/A</Text>;
      },
    },
    {
      title: 'Calidad del Aire',
      dataIndex: 'measurements',
      key: 'aqi',
      align: 'center',
      render: (measurements) => {
        const { level, color, textColor } = getAqiInfo(measurements?.pm25);
        return <Tag color={color} style={{ color: textColor, minWidth: '80px', textAlign: 'center' }}>{level}</Tag>;
      },
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => (
        <Tag color={status?.trim().toLowerCase() === 'online' ? 'green' : 'red'}>
          {status?.trim().toLowerCase() === 'online' ? 'Online' : 'Offline'}
        </Tag>
      ),
    },
    {
      title: 'Acciones',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Button type="link" onClick={() => navigate(`/stations/${record.id}`)}>
          Ver Detalles
        </Button>
      ),
    },
  ];

  return (
    <Card title="Todas las Estaciones de Monitoreo">
      <Space style={{ marginBottom: 16, width: '100%' }}>
        <Search
          placeholder="Buscar por nombre..."
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          style={{ flex: 1 }}
        />
        <Select defaultValue="all" style={{ width: 200 }} onChange={setAqiFilter}>
          <Option value="all">Todos los Niveles de AQI</Option>
          <Option value="Buena">Buena</Option>
          <Option value="Moderada">Moderada</Option>
          <Option value="Dañina (GS)">Dañina (GS)</Option>
          <Option value="Dañina">Dañina</Option>
          <Option value="Muy Dañina">Muy Dañina</Option>
          <Option value="Peligrosa">Peligrosa</Option>
        </Select>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredStations}
        rowKey="id"
        pagination={{ pageSize: 15 }}
      />
    </Card>
  );
};

export default StationsListPage;