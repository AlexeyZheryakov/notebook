import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotesEdit, { TEST_ID } from './NotesEdit';

describe('<NotesEdit />', () => {
  test('it should mount', () => {
    const { getByTestId } = render(<NotesEdit />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
  });
});
