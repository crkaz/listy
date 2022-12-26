import { render, screen } from '@testing-library/react';

import React from 'react';
import SubmitField from '.';
import userEvent from '@testing-library/user-event';

const mockFn = jest.fn();

test('renders a textbox control', () => {
  render(<SubmitField placeholder="" maxLength={60} submitHandler={mockFn} />);
  const element = screen.getByRole('textbox');
  expect(element).toBeInTheDocument();
});

test("doesn't call submitHandler function when the user presses enter, if text length is 0", () => {
  const mockFn = jest.fn();
  render(<SubmitField placeholder="" maxLength={60} submitHandler={mockFn} />);
  const textboxElement = screen.getByRole('textbox');
  userEvent.type(textboxElement, '{enter}');
  expect(mockFn).toBeCalledTimes(0);
});

test('calls submitHandler function when the user presses enter, if text length is greater than 0', () => {
  const mockFn = jest.fn();
  render(<SubmitField placeholder="" maxLength={60} submitHandler={mockFn} />);
  const textboxElement = screen.getByRole('textbox');
  userEvent.type(textboxElement, '123{enter}');
  expect(mockFn).toBeCalledTimes(1);
});

test('input is cleared when the user presses enter', () => {
  render(<SubmitField placeholder="" maxLength={60} submitHandler={mockFn} />);
  const textboxElement = screen.getByRole('textbox');
  userEvent.type(textboxElement, 'Test List Title');
  expect(textboxElement).toHaveValue('Test List Title');
  userEvent.type(textboxElement, '{enter}');
  expect(textboxElement).toHaveValue('');
});

test('input has correct placeholder attribute', () => {
  render(
    <SubmitField placeholder="test" maxLength={60} submitHandler={mockFn} />
  );
  const textboxElement = screen.getByRole('textbox');
  expect(textboxElement.getAttribute('placeholder')).toMatch(/test/);
});

test('input has correct maxLength attribute', () => {
  render(<SubmitField placeholder="" maxLength={60} submitHandler={mockFn} />);
  const textboxElement = screen.getByRole('textbox');
  expect(textboxElement.getAttribute('maxLength')).toBe('60');
});
