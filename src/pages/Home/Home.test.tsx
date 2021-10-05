/**
 * @jest-environment jsdom
 */
import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Home from './Home';



const mock =  function() {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  };
};

window.IntersectionObserver  = mock as any;


describe('Test Home Component', () => {
  test('Home is rendered', async () => {
    const { queryByText } = render(<Home />);
    expect(queryByText('Search pokemons')).toBeTruthy();
  });
});
