import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TableView from '../';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('TableView', () => {
  beforeEach(() => {
    // Mocked Response
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          _id: '1',
          equipmentNumber: '1',
          address: 'Test1',
          contractStartDate: '2022-06-30T20:23:54.477Z',
          contractEndDate: '2023-06-30T20:23:54.477Z',
          status: 'RUNNING',
        },
        {
          _id: '2',
          equipmentNumber: '2',
          address: 'Test2',
          contractStartDate: '2022-06-30T20:23:54.477Z',
          contractEndDate: '2023-06-30T20:23:54.477Z',
          status: 'RUNNING',
        },
      ],
    });
  });

  test('Number of rows in table are correct', async () => {
    render(<TableView />);

    await waitFor(() => {
      const equipments = screen.getAllByTestId('equipment-row');
      expect(equipments.length).toBe(2);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
