import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExpensesEdit, { TEST_ID } from './ExpensesEdit';

describe('<ExpensesEdit />', () => {
  test('it should mount', () => {
    const { getByTestId } = render(<ExpensesEdit />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
  });
});
