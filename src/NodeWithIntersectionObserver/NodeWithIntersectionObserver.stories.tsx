import 'intersection-observer';
import React, { useCallback, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { NodeWithIntersectionObserver } from './NodeWithIntersectionObserver.component';

const RootMarginBlock = ({ side, value }: { side: string; value: string }) => {
  return value !== null ? (
    <div
      style={{
        position: 'fixed',
        [side]: 0,
        [side == 'top' || side == 'bottom' ? 'height' : 'width']: value,
        [side == 'top' || side == 'bottom' ? 'width' : 'height']: '100%',
        backgroundColor: 'rgba(100,100,100,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      Margin {side}: {value}
    </div>
  ) : null;
};

const RootMarginVisualizer = ({
  top,
  right,
  bottom,
  left,
}: {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}) => {
  return (
    <React.Fragment>
      {top ? <RootMarginBlock side="top" value={top} /> : null}
      {right ? <RootMarginBlock side="right" value={right} /> : null}
      {bottom ? <RootMarginBlock side="bottom" value={bottom} /> : null}
      {left ? <RootMarginBlock side="left" value={left} /> : null}
    </React.Fragment>
  );
};

const Story = ({
  observerOptions,
  isEnabled,
  isRatioVisible = false,
  rootMarginVisualizerOptions = {},
}: {
  observerOptions?: {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number[];
  };
  isEnabled?: boolean;
  observedElementText?: string;
  isRatioVisible?: boolean;
  rootMarginVisualizerOptions?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}) => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const [intersectionRatio, setIntersectionRatio] = useState<number>(0);

  const handleIntersectionChange = useCallback(
    (entry) => {
      setIsIntersecting(entry.isIntersecting);
      setIntersectionRatio(entry.intersectionRatio);
    },
    [setIsIntersecting],
  );

  return (
    <React.Fragment>
      <RootMarginVisualizer {...rootMarginVisualizerOptions} />
      <div
        style={{
          position: 'fixed',
          top: 'calc(50% - 30px)',
          left: 'calc(50% - 150px)',
          boxSizing: 'border-box',
          padding: '10px',
          height: '60px',
          width: '300px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isIntersecting
            ? 'rgba(0, 255, 0, 0.5'
            : 'rgba(255,0,0,0.5)',
          color: '#fff',
        }}
      >
        {isIntersecting
          ? [
              'Observed element is intersecting',
              isRatioVisible && isIntersecting
                ? ` (ratio: ${intersectionRatio})`
                : null,
              '.',
            ].join('')
          : 'Observed element is not intersecting.'}
      </div>

      <div
        style={{
          height: '110vh',
        }}
      />

      <NodeWithIntersectionObserver
        onIntersection={handleIntersectionChange}
        observerOptions={{
          ...observerOptions,
          // We're explicitly setting root element because
          //  IntersectionObserver does not behave well when
          //  used within an iframe, more info here:
          //  https://github.com/w3c/IntersectionObserver/issues/283
          root: document.body,
        }}
        isEnabled={isEnabled}
      >
        {({ observedNodeReference }) => {
          return (
            <div
              ref={observedNodeReference}
              style={{
                backgroundColor: 'yellow',
                padding: 40,
              }}
            >
              Observed element
            </div>
          );
        }}
      </NodeWithIntersectionObserver>

      <div
        style={{
          height: '110vh',
        }}
      />
    </React.Fragment>
  );
};

storiesOf('NodeWithIntersectionObserver', module)
  .add('Default', () => (
    <React.Fragment>
      <Story isRatioVisible={true} />
    </React.Fragment>
  ))
  .add('With custom rootMargin', () => (
    <React.Fragment>
      <Story
        observerOptions={{
          root: document.documentElement,
          threshold: [0, 0.25, 0.5, 0.75, 1],
          rootMargin: '-100px 0px -100px 0px',
        }}
        isRatioVisible={true}
        rootMarginVisualizerOptions={{
          top: '100px',
          bottom: '100px',
        }}
      />
    </React.Fragment>
  ))
  .add('With custom threshold', () => (
    <React.Fragment>
      <Story
        observerOptions={{
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }}
        isRatioVisible={true}
      />
    </React.Fragment>
  ));
