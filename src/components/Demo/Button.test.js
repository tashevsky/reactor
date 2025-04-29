import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

test('renders button with certain font size and color', () => {
  render(<Button size={20} tColor="red" />);
  
  const buttonElement = screen.getByText('Click me');

  expect(buttonElement).toBeInTheDocument();

  expect(buttonElement).toHaveStyle({ fontSize: '20px' });
  expect(buttonElement).toHaveStyle({ color: 'red' });
});