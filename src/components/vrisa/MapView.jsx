// src/components/vrisa/MapView.jsx
import React, { useState } from 'react';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
} from 'react-map-gl';
import { Button, Typography } from 'antd';
import PropTypes from 'prop-types';
import { getAqiInfo } from './utils/aqiHelper';
import 'mapbox-gl/dist/mapbox-gl.css';

const { Title, Text } = Typography;

const createAqiIcon = (station) => {
  const { color, textColor } = getAqiInfo(
    station.measurements.pm25,
    station.status
  );
  const value =
    station.status === 'online' ? Math.round(station.measurements.pm25) : '?';

  return (
    <div
      style={{
        backgroundColor: color,
        color: textColor,
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: 'bold',
        border: '2px solid white',
        boxShadow: '0 2px 5px rgba(0,0,0,0.4)',
        cursor: 'pointer',
      }}
    >
      {value}
    </div>
  );
};

const MapView = ({ stations, onStationSelect }) => {
  const [popupInfo, setPopupInfo] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: -76.532,
    latitude: 3.4516,
    zoom: 11,
  });

  const mapboxAccessToken =
    'pk.eyJ1IjoibWFuamxvIiwiYSI6ImNtajBoZDNveDA3dG8zZHEwajNicWdydnUifQ.-uR9U8Kataak3WhRIPm8qg'; // Public token
  const MAP_CENTER_DEFAULT = {
    latitude: 3.3754175142149068,
    longitude: -76.51110548997244,
  };
  return (
    <div
      style={{
        height: '80vh',
        width: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <Map
        {...viewState}
        initialViewState={{
          latitude: MAP_CENTER_DEFAULT.latitude,
          longitude: MAP_CENTER_DEFAULT.longitude,
          zoom: 10,
        }}
        onMove={(evt) => setViewState(evt.viewState)}
        // style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/manjlo/cmj0jleff00bd01qidjwm6pl8"
        mapboxAccessToken={mapboxAccessToken}
      >
        <GeolocateControl position="top-left" />
        <NavigationControl position="top-left" />

        {stations.map((station) => (
          <Marker
            key={station.id}
            longitude={station.lng}
            latitude={station.lat}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(station);
            }}
          >
            {createAqiIcon(station)}
          </Marker>
        ))}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.lng)}
            latitude={Number(popupInfo.lat)}
            onClose={() => setPopupInfo(null)}
            closeOnClick={false}
          >
            <div style={{ padding: '5px' }}>
              <Title level={5}>{popupInfo.name}</Title>
              <Text>
                <strong>Estado:</strong>{' '}
                {
                  getAqiInfo(popupInfo.measurements.pm25, popupInfo.status)
                    .level
                }
              </Text>
              <br />
              <Button
                type="primary"
                size="small"
                onClick={() => onStationSelect(popupInfo)}
                style={{ marginTop: '10px' }}
              >
                Ver Detalles
              </Button>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

MapView.propTypes = {
  stations: PropTypes.array.isRequired,
  onStationSelect: PropTypes.func.isRequired,
};

export default MapView;
