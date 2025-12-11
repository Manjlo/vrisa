// src/components/vrisa/StationList.jsx
import React, { useState } from 'react';
import { Table, Tag, Input, Select, Space, Button, Card } from 'antd';
import PropTypes from 'prop-types';
import { getAqiInfo } from './utils/aqiHelper';

const { Search } = Input;
const { Option } = Select;

const StationList = ({ stations, onStationSelect, onViewOnMap }) => {
  const [searchText, setSearchText] = useState('');
  const [aqiFilter, setAqiFilter] = useState('all');

  const filteredStations = stations
    .filter((s) => s?.name?.toLowerCase()?.includes(searchText.toLowerCase()))
    .filter((s) => {
      if (aqiFilter === 'all') return true;
      const { level } = getAqiInfo(s.measurements.pm25);
      if (aqiFilter === 'Dañina') return level.startsWith('Dañina');
      return level === aqiFilter;
    });

  const columns = [
    {
      title: 'Estación',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <a onClick={() => onStationSelect(record)}>{text}</a>
      ),
    },
    {
      title: 'AQI (PM₂.₅)',
      dataIndex: 'measurements',
      key: 'aqi',
      render: (measurements) => {
        const { level, color, textColor } = getAqiInfo(
          measurements.pm25
        );
        return (
          <Tag color={color} style={{ color: textColor }}>
            {level}
          </Tag>
        );
      },
      sorter: (a, b) => (a.measurements?.pm25 ?? -1) - (b.measurements?.pm25 ?? -1),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Button type="link" size="small" onClick={() => onViewOnMap(record)}>
          Ver en mapa
        </Button>
      ),
    },
  ];

  return (
    <Card
      title="Estaciones de Monitoreo"
      size="small"
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }}>
        <Search
          placeholder="Buscar por nombre"
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
        />
        <Select
          defaultValue="all"
          style={{ width: '100%' }}
          onChange={setAqiFilter}
        >
          <Option value="all">Todos los estados</Option>
          <Option value="Buena">Buena</Option>
          <Option value="Moderada">Moderada</Option>
          <Option value="Dañina">Dañina (+)</Option>
        </Select>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredStations}
        rowKey="id"
        size="small"
        pagination={{ pageSize: 10, size: 'small' }}
        scroll={{ y: 'calc(100vh - 380px)' }}
        style={{ flex: 1 }}
      />
    </Card>
  );
};

StationList.propTypes = {
  stations: PropTypes.array.isRequired,
  onStationSelect: PropTypes.func.isRequired,
  onViewOnMap: PropTypes.func.isRequired,
};

export default StationList;
