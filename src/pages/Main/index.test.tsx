import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Main, { TEST_ID } from './Main';

describe('<Main />', () => {
  test('it should mount', () => {
    const { getByTestId } = render(<Main />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
  });
});
