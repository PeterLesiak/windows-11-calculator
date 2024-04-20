'use client';

import Image from 'next/image';
import { useRef, useState, useEffect, type ReactElement } from 'react';

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
  minimumHeight: 508,
  width: 322,
  height: 508,
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

  const [draggable, setDraggable] = useState(false);

  const calculatorRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('mouseover', e => {
      const element = toolbarRef.current;

      if (!element) return;

      setDraggable(element.contains(e.target as Node));
    });

    window.addEventListener('mousedown', e => {
      const element = calculatorRef.current;

      if (!element) return;

      element.style.borderColor = element.contains(e.target as Node)
        ? configuration.color
        : '';
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
      disableDragging={!draggable}
    >
      <div
        className="h-full w-full cursor-default select-none rounded-lg border border-dark-600 bg-dark-700 drop-shadow-5xl"
        ref={calculatorRef}
      >
        <div className="flex h-8 pl-[17px]" ref={toolbarRef}>
          <div className="mb-auto mt-auto">
            <Image src="/icons/calculator.png" width={17} height={18} alt="Calculator Icon" />
          </div>
          <div className="mb-auto ml-[14px] mt-auto text-xs font-thin tracking-wide text-light-100">
            Calculator
          </div>
          <div className="ml-auto grid [grid-template-columns:repeat(3,1fr)]">
            <div className="flex w-[46px] hover:bg-dark-600">
              <Image
                className="m-auto invert"
                src="/icons/minimize.png"
                width={10}
                height={10}
                alt="Minimize Icon"
              />
            </div>
            <div className="flex hover:bg-dark-600">
              <Image
                className="m-auto invert"
                src="/icons/square.png"
                width={11}
                height={11}
                alt="Maximize Icon"
              />
            </div>
            <div className="flex rounded-tr-lg hover:bg-red">
              <Image
                className="m-auto invert"
                src="/icons/close.png"
                width={14}
                height={14}
                alt="Close Icon"
              />
            </div>
          </div>
        </div>
      </div>
    </Rnd>
  );
};
