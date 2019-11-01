I chose not to continue with the development of this package.

I found a package that is actively maintained and has an API similar to the one I was creating, its available here: https://github.com/thebuilder/react-intersection-observer

# React Intersection Observer

A simple wrapper for IntersectionObserver API.

Run storybook locally:
`yarn storybook`

## Examples

### UseIntersectionObserver

```typescript jsx
const Example = () => {
  const [state, setState] = useState<ExampleState>({});
  const handleIntersection = useCallback(
    (entry: IntersectionObserverEntry) => {
      setState((state) => ({ ...state, entry }));
    },
    [setState],
  );

  const { observedNodeReference } = useIntersectionObserver({
    observerOptions: {},
    onIntersection: handleIntersection,
  });

  return <div ref={observedNodeReference}>{entry.isIntersecting}</div>;
};
```

### UseInViewport

```typescript jsx
const Example = () => {
  const { observedNodeReference, entry, inViewport } = useInViewport({
    observerOptions: { root: document.documentElement },
  });

  return (
    <div ref={observedNodeReference}>
      {inViewport ? 'in viewport' : 'not in viewport'}
    </div>
  );
};
```

### NodeWithIntersectionObserver

```typescript jsx
const Example = () => {
  return (
    <NodeWithIntersectionObserver
      observerOptions={{
        root: document.documentElement,
      }}
    >
      {({ observedNodeReference, inViewport }) => {
        return (
          <div
            ref={observedNodeReference}
            style={{
              backgroundColor: 'yellow',
              padding: 40,
            }}
          >
            {inViewport ? 'in viewport' : 'not in viewport'}
          </div>
        );
      }}
    </NodeWithIntersectionObserver>
  );
};
```
