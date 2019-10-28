import { useEffect, useRef } from 'react';

export function useIntersectionObserver({
  observerOptions = {},
  onIntersection,
}: {
  observerOptions?: {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number[];
  };
  onIntersection?: (entry: IntersectionObserverEntry) => void;
}) {
  const observedNodeReference = useRef<HTMLDivElement>(null);
  const observerReference = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (onIntersection && observedNodeReference.current) {
      observerReference.current = new IntersectionObserver((entries) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          onIntersection(entry);
        });
      }, observerOptions);
      observerReference.current.observe(observedNodeReference.current);
    }

    return () => {
      if (observerReference.current) {
        observerReference.current.disconnect();
      }
    };
  }, [
    observerOptions.root,
    observerOptions.rootMargin,
    observerOptions.threshold,
    onIntersection,
    observedNodeReference.current,
  ]);

  return { observedNodeReference: observedNodeReference };
}
