import React from 'react';
import { Example } from './example';
// eslint-disable-next-line import/no-extraneous-dependencies
import { cleanup, render } from '@testing-library/react';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('Renders "test" text', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  const output = render(<Example />);
  const { queryByText } = render(<Example />);

  debugger;

  expect(queryByText(/test/i)).toBeTruthy();
});
