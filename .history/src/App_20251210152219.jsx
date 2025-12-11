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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/stations"
        element={
          <ProtectedRoute>
            <StationsList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/stations/:id"
        element={
          <ProtectedRoute>
            <StationDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/map"
        element={
          <ProtectedRoute>
            <MapView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/alerts"
        element={
          <ProtectedRoute>
            <Alerts />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
