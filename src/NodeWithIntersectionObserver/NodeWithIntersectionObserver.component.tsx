import React, { RefObject, ReactNode } from 'react';
import { useInViewport } from '../useInViewport';

interface NodeWithIntersectionObserverProps {
  observerOptions?: {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number[];
  };
  onIntersection?: (entry: IntersectionObserverEntry) => void;
  children:
    | ReactNode
    | (({
        entry,
        observedNodeReference,
        inViewport,
      }: {
        entry?: IntersectionObserverEntry;
        observedNodeReference: RefObject<HTMLDivElement>;
        inViewport?: boolean;
      }) => ReactNode);
}

export const NodeWithIntersectionObserver = ({
  observerOptions = {},
  children,
  onIntersection,
}: NodeWithIntersectionObserverProps) => {
  const { observedNodeReference, entry, inViewport } = useInViewport({
    observerOptions,
    onIntersection,
  });

  return (
    <React.Fragment>
      {typeof children === 'function'
        ? children({ observedNodeReference, entry, inViewport })
        : children}
    </React.Fragment>
  );
};
