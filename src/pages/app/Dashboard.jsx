import React, { useState } from 'react';
import { Layout, Spin, Alert, Button, Grid } from 'antd';
import { useStations } from 'src/hooks/useStations';
import TopMetrics from 'src/components/vrisa/TopMetrics';
import MapView from 'src/components/vrisa/MapView';
import StationList from 'src/components/vrisa/StationList';
import StationDetailDrawer from 'src/components/vrisa/StationDetailDrawer';
import { MenuOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { useBreakpoint } = Grid;

const Dashboard = () => {
  const { stations, loading, error, reloadStations } = useStations();
  const [selectedStation, setSelectedStation] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.lg;

  const handleStationSelect = (station) => {
    setSelectedStation(station);
    if (station) setDrawerVisible(true);
  };

  const handleViewOnMap = (station) => {
    console.log('Centrar mapa en:', station.name);
    // Future logic to center map
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Spin size="large" tip="Cargando datos..." />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        action={<Button onClick={reloadStations}>Reintentar</Button>}
      />
    );
  }

  return (
    <>
      <TopMetrics stations={stations} />
      <Layout style={{ background: 'transparent', marginTop: 24 }}>
        <Content style={{ display: 'flex', flex: '1 1 auto' }}>
          <div style={{ flex: '1 1 70%', minWidth: 0 }}>
            <MapView
              stations={stations}
              onStationSelect={handleStationSelect}
            />
          </div>
          {!isMobile && (
            <div
              style={{
                flex: '0 0 30%',
                height: 'calc(100vh - 250px)',
                overflowY: 'auto',
                marginLeft: '24px',
              }}
            >
              <StationList
                stations={stations}
                onStationSelect={handleStationSelect}
                onViewOnMap={handleViewOnMap}
              />
            </div>
          )}
        </Content>
      </Layout>
      {isMobile && (
        <Button
          type="primary"
          shape="round"
          icon={<MenuOutlined />}
          style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}
          onClick={() => setDrawerVisible(true)}
        >
          Estaciones
        </Button>
      )}
      <StationDetailDrawer
        station={selectedStation}
        visible={drawerVisible}
        onClose={() => {
          setDrawerVisible(false);
          setSelectedStation(null);
        }}
        isMobile={isMobile}
      />
    </>
  );
};

export default Dashboard;
