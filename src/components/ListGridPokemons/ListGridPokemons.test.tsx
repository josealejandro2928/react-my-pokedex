
/**
 * @jest-environment jsdom
 */
/* eslint-disable jest/no-mocks-import */
import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ListGridPokemons from './ListGridPokemons';

import pokemons from '../../__mocks__/pokemons.json';

window.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
})) as any;

describe('Test ListGridPokemons Component', () => {
  test('ListGridPokemons is rendered', async () => {
    const { queryByTestId } = render(<ListGridPokemons pokemons={[]} stopInfiniteScrolling={true} />);
    expect(queryByTestId('list-grid-pokemons-testid')).toBeTruthy();
  });

  test('ListGridPokemons render correctly the list', async () => {
    const { queryByText } = render(<ListGridPokemons pokemons={pokemons} stopInfiniteScrolling={true} />);
    expect(queryByText('bulbasaur')).toBeTruthy();
    expect(queryByText('ivysaur')).toBeTruthy();
    expect(queryByText('venusaur')).toBeTruthy();
  });
});
