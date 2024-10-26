import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Expenses, { TEST_ID } from './Expenses';

describe('<Expenses />', () => {
  test('it should mount', () => {
    const { getByTestId } = render(<Expenses />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
  });
});
