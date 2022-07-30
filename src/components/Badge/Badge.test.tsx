/**
 * @jest-environment jsdom
 */
import React from 'react';

import { render } from '@testing-library/react';
import Badge from './Badge';

describe('Test Badge Component', () => {
  test('Badge is rendered', async () => {
    const { queryByTestId } = render(<Badge value={0} />);
    expect(queryByTestId('badge-testid')).toBeTruthy();
  });

  test('Should badge component render a correct value', async () => {
    const { queryByTestId } = render(<Badge value={10} />);
    expect(queryByTestId('badge-testid')?.textContent).toBe(10 + '');
  });
  test('Should badge component render a correct background color', async () => {
    const { queryByTestId } = render(<Badge value={10} backgroundColor="#fafa34" />);
    expect(queryByTestId('badge-testid')?.style.backgroundColor).toBe('rgb(250, 250, 52)');
  });
});
