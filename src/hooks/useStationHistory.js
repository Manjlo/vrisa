import { useState, useEffect, useCallback } from 'react';
import { getStationHistory } from 'src/services/stationService';

export const useStationHistory = (stationId) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = useCallback(async () => {
    if (!stationId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getStationHistory(stationId);
      setHistory(data);
    } catch (err) {
      setError(err.message || 'Ocurrió un error al cargar el historial');
    } finally {
      setLoading(false);
    }
  }, [stationId]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    history,
    loading,
    error,
    reloadHistory: fetchHistory,
  };
};
