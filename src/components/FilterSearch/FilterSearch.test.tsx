/**
 * @jest-environment jsdom
 */
import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import FilterSearch from './FilterSearch';

describe('Test FilterSearch Component', () => {
  test('FilterSearch is rendered', async () => {
    const { queryByTestId } = render(<FilterSearch />);
    expect(queryByTestId('filter-search-testid')).toBeTruthy();
  });

  test('Should inputs update the state when changing value', async () => {
    const { queryByTestId } = render(<FilterSearch />);
    const inputSearch = queryByTestId('search-input-id');
    const checkbox = queryByTestId('check-input-id');

    await act(async () => {
      fireEvent.input(inputSearch as any, {
        target: {
          value: 'pokemon',
        },
      });
    });

    await act(async () => {
      fireEvent.change(checkbox as any, {
        target: {
          checked: true,
        },
      });
    });
    expect((inputSearch as any)?.value).toBe('pokemon');
    expect((checkbox as any)?.checked).toBe(true);
  });

  test('Should  FilterSearch component give the correct data when search button is clicked', async () => {
    const onFilterChange = (value: any) => {
      expect(value).toEqual({ name: 'Lugia', onlyMyList: false });
    };

    const { queryByTestId } = render(<FilterSearch filterChange={onFilterChange} />);
    const inputSearch = queryByTestId('search-input-id');
    const checkbox = queryByTestId('check-input-id');

    await act(async () => {
      fireEvent.input(inputSearch as any, {
        target: {
          value: 'Lugia',
        },
      });
    });

    await act(async () => {
      fireEvent.change(checkbox as any, {
        target: {
          checked: false,
        },
      });
    });

    await act(async () => {
      fireEvent.click(queryByTestId('search-btn-testid') as any);
    });
  });
});
