import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TemplateName, { TEST_ID } from './TemplateName';

describe('<TemplateName />', () => {
  test('it should mount', () => {
    const { getByTestId } = render(<TemplateName />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
  });
});
