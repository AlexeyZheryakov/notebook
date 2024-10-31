import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Settings, { TEST_ID } from './Settings';

describe('<Settings />', () => {
  test('it should mount', () => {
    const { getByTestId } = render(<Settings />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
  });
});
