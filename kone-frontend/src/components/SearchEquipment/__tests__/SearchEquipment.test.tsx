import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchEquipment from '../';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SearchEquipment', () => {
  beforeEach(() => {
    // Mocked Response
    mockedAxios.get.mockResolvedValue({
      data: {
        _id: '1',
        equipmentNumber: '100000',
        address: 'Test100000',
        contractStartDate: '2025-06-30T20:23:54.477Z',
        contractEndDate: '2026-06-30T20:23:54.477Z',
        status: 'RUNNING',
      },
    });
  });

  test('Equipment is searched and correct details shown', async () => {
    render(<SearchEquipment />);

    // Click Search Button
    const searchBtn = await screen.findByRole('button', { name: /Search Equipment/i });
    fireEvent.click(searchBtn);

    await new Promise((r) => setTimeout(r, 2000));

    expect(screen.getByText('100000')).toBeInTheDocument();
    expect(screen.getByText('Test100000')).toBeInTheDocument();
    expect(screen.getByText('30.06.2025')).toBeInTheDocument();
    expect(screen.getByText('30.06.2026')).toBeInTheDocument();
    expect(screen.getByText('RUNNING')).toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
