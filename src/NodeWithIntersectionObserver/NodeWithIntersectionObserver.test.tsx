import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { cleanup, render } from '@testing-library/react';
import { NodeWithIntersectionObserver } from './NodeWithIntersectionObserver.component';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('Renders children', () => {
  const { queryByText } = render(
    <NodeWithIntersectionObserver>text</NodeWithIntersectionObserver>,
  );

  expect(queryByText(/text/i)).toBeTruthy();
});
