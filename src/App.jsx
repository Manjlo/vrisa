import { Routes, Route } from 'react-router-dom';
import Home from 'src/pages/Home';
import Login from 'src/pages/Login';
import Register from 'src/pages/Register';
import Dashboard from 'src/pages/app/Dashboard';
import StationsList from 'src/pages/app/StationsList';
import StationDetail from 'src/pages/app/StationDetail';
import MapView from 'src/pages/app/MapView';
import Alerts from 'src/pages/app/Alerts';
import ProtectedRoute from 'src/components/shared/ProtectedRoute';
import AppLayout from 'src/components/shared/AppLayout';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <AppLayout />
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="stations" element={<StationsList />} />
        <Route path="stations/:id" element={<StationDetail />} />
        <Route path="map" element={<MapView />} />
        <Route path="alerts" element={<Alerts />} />
      </Route>
    </Routes>
  );
}

export default App;
