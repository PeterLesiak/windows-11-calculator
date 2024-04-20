'use client';

import { useRef, useEffect, type ReactElement } from 'react';

import { Rnd } from 'react-rnd';

export interface CalculatorProperties {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  color?: string;
}

export const configuration = {
  minimumWidth: 322,
  minimumHeight: 502,
  width: 322,
  height: 502,
  x: 0,
  y: 0,
  color: 'hsl(358, 63%, 51%)',
};

export const Windows11Calculator = (props: CalculatorProperties): ReactElement => {
  configuration.color = props.color ?? configuration.color;
  configuration.width = props.width ?? configuration.width;
  configuration.height = props.height ?? configuration.height;
  configuration.x = props.x ?? (window.innerWidth - configuration.width) / 2;
  configuration.y = props.y ?? (window.innerHeight - configuration.height) / 2;

  const thisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('mousedown', e => {
      const element = thisRef.current;

      if (!element) return;

      element.style.borderColor = e.target === element ? configuration.color : '';
    });
  }, []);

  return (
    <Rnd
      default={{
        width: configuration.width,
        height: configuration.height,
        x: configuration.x,
        y: configuration.y,
      }}
      minWidth={configuration.minimumWidth}
      minHeight={configuration.minimumHeight}
    >
      <div
        className="h-full w-full cursor-default rounded-lg border border-dark-600 bg-dark-700 drop-shadow-5xl"
        ref={thisRef}
      ></div>
    </Rnd>
  );
};
