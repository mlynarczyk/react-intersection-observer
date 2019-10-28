import { useCallback, useState } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

interface useInViewportState {
  inViewport?: boolean;
  entry?: IntersectionObserverEntry;
}

interface useInViewportProps {
  observerOptions?: {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number[];
  };
  onIntersection?: (entry: IntersectionObserverEntry) => void;
  isEnabled?: boolean;
}

export const useInViewport = ({
  observerOptions,
  isEnabled,
  onIntersection,
}: useInViewportProps) => {
  const [state, setState] = useState<useInViewportState>({});

  const handleIntersection = useCallback(
    (entry: IntersectionObserverEntry) => {
      setState((state) => ({ ...state, entry }));
      onIntersection && onIntersection(entry);
    },
    [setState],
  );

  const { observedNodeReference } = useIntersectionObserver({
    observerOptions,
    onIntersection: handleIntersection,
    isEnabled,
  });

  return {
    observedNodeReference,
    entry: state.entry,
    inViewport: state.entry && state.entry.isIntersecting,
  };
};
