import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { NodeWithIntersectionObserver } from './NodeWithIntersectionObserver.component';

afterEach(cleanup);

it('Renders children', () => {
  const { queryByText } = render(
    <NodeWithIntersectionObserver>text</NodeWithIntersectionObserver>,
  );

  expect(queryByText(/text/i)).toBeTruthy();
});
