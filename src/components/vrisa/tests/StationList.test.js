// src/components/vrisa/tests/StationList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StationList from '../StationList';
import { stationsData } from '../../../data/mockData';

// Mock de funciones
const mockOnStationSelect = jest.fn();
const mockOnViewOnMap = jest.fn();

describe('StationList', () => {
  beforeEach(() => {
    render(
      <StationList
        stations={stationsData}
        onStationSelect={mockOnStationSelect}
        onViewOnMap={mockOnViewOnMap}
      />
    );
  });

  it('renderiza los nombres de las estaciones', () => {
    expect(screen.getByText('Estación Norte')).toBeInTheDocument();
    expect(screen.getByText('Estación Centro')).toBeInTheDocument();
  });

  it('filtra la lista al escribir en el campo de búsqueda', () => {
    const searchInput = screen.getByPlaceholderText('Buscar por nombre');
    fireEvent.change(searchInput, { target: { value: 'Norte' } });

    expect(screen.getByText('Estación Norte')).toBeInTheDocument();
    expect(screen.queryByText('Estación Centro')).not.toBeInTheDocument();
  });

  it('llama a onStationSelect cuando se hace clic en el nombre de una estación', () => {
    const stationLink = screen.getByText('Estación Pance');
    fireEvent.click(stationLink);
    
    // stationsData[2] es "Estación Pance"
    expect(mockOnStationSelect).toHaveBeenCalledWith(stationsData[2]);
  });
});
