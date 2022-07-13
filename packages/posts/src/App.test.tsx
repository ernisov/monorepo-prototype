import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const button = screen.getByText(/Testing UI Library/i);
  expect(button).toBeInTheDocument();
});
