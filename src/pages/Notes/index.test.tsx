import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notes, { TEST_ID } from './Notes';

describe('<Notes />', () => {
  test('it should mount', () => {
    const { getByTestId } = render(<Notes />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
  });
});
