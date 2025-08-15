import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ItemForm from '../component/ItemForm';

describe('ItemForm', () => {
  const mockSubmit = jest.fn();

  const initialValues = { name: '', quantity: '', notes: '' };

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it('renders all input fields and submit button', () => {
    const { getByPlaceholderText, getByText } = render(
      <ItemForm initialValues={initialValues} formSubmit={mockSubmit} />
    );

    expect(getByPlaceholderText('Enter your name')).toBeTruthy();
    expect(getByPlaceholderText('Enter Quantity')).toBeTruthy();
    expect(getByPlaceholderText('Enter notes(Optional)')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
  });

  it('shows validation errors for empty fields', async () => {
    const { getByText } = render(
      <ItemForm initialValues={initialValues} formSubmit={mockSubmit} />
    );

    fireEvent.press(getByText('Submit'));

    await waitFor(() => {
      expect(getByText('Item Name is required')).toBeTruthy();
      expect(getByText('Quantity is required')).toBeTruthy();
    });

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('shows error if name is too short', async () => {
    const { getByPlaceholderText, getByText } = render(
      <ItemForm initialValues={initialValues} formSubmit={mockSubmit} />
    );

    fireEvent.changeText(getByPlaceholderText('Enter your name'), 'A');
    fireEvent.changeText(getByPlaceholderText('Enter Quantity'), '1');

    fireEvent.press(getByText('Submit'));

    await waitFor(() => {
      expect(getByText('Too short!')).toBeTruthy();
    });

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('calls formSubmit with valid data', async () => {
    const { getByPlaceholderText, getByText } = render(
      <ItemForm initialValues={initialValues} formSubmit={mockSubmit} />
    );

    fireEvent.changeText(getByPlaceholderText('Enter your name'), 'Apple');
    fireEvent.changeText(getByPlaceholderText('Enter Quantity'), '5');
    fireEvent.changeText(getByPlaceholderText('Enter notes(Optional)'), 'Some notes');

    fireEvent.press(getByText('Submit'));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'Apple',
        quantity: '5',
        notes: 'Some notes',
      });
    });
  });
});
