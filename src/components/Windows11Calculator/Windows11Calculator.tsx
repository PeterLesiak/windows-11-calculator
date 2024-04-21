'use client';

import { useState, useRef, useEffect, type ReactElement } from 'react';
import Image from 'next/image';

import { Rnd } from 'react-rnd';

import './styles.css';

export const enum Colors {
  RED = 'var(--clr-accent-red)',
  ORANGE = 'var(--clr-accent-orange)',
}

export interface CalculatorProperties {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  color?: Colors;
}

const minimumWidth = 322;
const minimumHeight = 501;

export const Windows11Calculator = (props: CalculatorProperties): ReactElement => {
  const [width] = useState(props.width ?? minimumWidth);
  const [height] = useState(props.height ?? minimumHeight);
  const [x] = useState(props.x ?? (window.innerWidth - width) / 2);
  const [y] = useState(props.y ?? (window.innerHeight - height) / 2);
  const [color] = useState(props.color ?? Colors.RED);

  const [draggable, setDraggable] = useState(false);

  const calculatorRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculator = calculatorRef.current;

    if (calculator) {
      calculator.setAttribute('style', `--clr-current-accent: ${color}`);
    }
  }, [color]);

  useEffect(() => {
    window.addEventListener('mouseover', e => {
      const element = toolbarRef.current;

      if (!element) return;

      setDraggable(element.contains(e.target as Node));
    });

    window.addEventListener('mousedown', e => {
      const element = calculatorRef.current;

      if (!element) return;

      if (element.contains(e.target as Node)) {
        element.style.borderColor = 'var(--clr-current-accent)';
        element.style.boxShadow = '0px 15px 60px -5px rgba(25, 25, 25, 1)';

        return;
      }

      element.style.borderColor = '';
      element.style.boxShadow = '';
    });
  });

  return (
    <Rnd
      default={{ width: width, height: height, x, y }}
      minWidth={minimumWidth}
      minHeight={minimumHeight}
      disableDragging={!draggable}
    >
      <div
        className="flex h-full w-full cursor-default select-none flex-col rounded-lg border border-dark-100 bg-dark-700 shadow-[0px_15px_60px_-15px_#191919]"
        ref={calculatorRef}
      >
        <div className="flex h-[50.5px] pl-[18px]" ref={toolbarRef}>
          <div className="mb-auto mt-auto">
            <Image src="/icons/calculator.png" width={17} height={17} alt="Calculator Icon" />
          </div>
          <div className="mb-auto ml-[13px] mt-auto text-xs font-medium tracking-wide text-light-100">
            Calculator
          </div>
          <div className="ml-auto grid [grid-template-columns:repeat(3,1fr)]">
            <div className="flex w-[46px] hover:bg-dark-400">
              <Image
                className="m-auto invert"
                src="/icons/minimize.png"
                width={10}
                height={10}
                alt="Minimize Icon"
              />
            </div>
            <div className="flex hover:bg-dark-400">
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

        <div className="mt-[7.5px] flex pl-1 pr-2">
          <div className="mb-auto mt-auto flex h-9 w-10 rounded-md hover:bg-dark-600">
            <Image
              className="m-auto"
              src="/icons/hamburger menu.png"
              width={17}
              height={17}
              alt="Toogle Menu Icon"
            />
          </div>
          <div className="mb-auto ml-1 mt-auto h-8 text-xl font-medium tracking-[0.015em] text-light-100">
            Standard
          </div>
          <div className="transition-Colors mb-auto ml-2 mt-auto flex h-8 w-8 rounded-md hover:bg-dark-600">
            <Image
              className="m-auto"
              src="/icons/keep on top.png"
              width={18}
              height={18}
              alt="Keep On Top Icon"
            />
          </div>
          <div className="transition-Colors mb-auto ml-auto mt-auto flex h-8 w-8 rounded-md hover:bg-dark-600">
            <Image
              className="m-auto"
              src="/icons/history.png"
              width={20}
              height={20}
              alt="Toogle History Icon"
            />
          </div>
        </div>

        <div className="mt-[7px] flex flex-col">
          <div className="flex h-[1.1rem] justify-end gap-x-[3px] pr-[18px] text-sm font-medium text-light-600">
            <span>123456789</span>
            <span>+</span>
            <span>1</span>
            <span>=</span>
          </div>
          <div className="flex cursor-text select-text justify-end gap-x-[9px] pr-3 text-[2.8rem] font-semibold tracking-[0.0015em] text-light-100">
            <span>123</span>
            <span>456</span>
            <span>790</span>
          </div>
        </div>

        <div className="*:transition-Colors mt-[6px] flex h-12 content-center items-center justify-between text-[13px] text-light-700 *:flex *:h-full *:items-center *:rounded-[0.25rem] *:px-[16px] *:duration-200">
          <div>MC</div>
          <div>MR</div>
          <div className="memory-active">M+</div>
          <div className="memory-active">M-</div>
          <div className="memory-active">MS</div>
          <div className="flex">
            M
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 18 18"
              className="mb-[2px] mr-1"
            >
              <path
                fill="currentColor"
                d="M12 14.379q-.162 0-.298-.053t-.267-.184L7.046 9.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16L12 13.292l4.246-4.246q.14-.14.344-.15t.364.15t.16.354t-.16.354l-4.389 4.388q-.13.131-.267.184q-.136.053-.298.053"
              />
            </svg>
          </div>
        </div>

        <div className="grid h-full gap-[0.15rem] px-1 pb-1 pt-[0.085rem] text-lg text-light-100 [grid-template-columns:repeat(4,1fr)] *:rounded-md">
          <button className="operator font-light" type="button">
            %
          </button>
          <button className="operator text-sm" type="button">
            CE
          </button>
          <button className="operator text-sm" type="button">
            C
          </button>
          <button
            className="operator grid place-items-center"
            type="button"
            title="Clear last digit"
          >
            <Image src="/icons/clear.png" width={15} height={15} alt="Clear" />
          </button>
          <button className="operator" type="button" title="1 Divided by X">
            ⅟<i className="text-sm">x</i>
          </button>
          <button className="operator text-sm" type="button">
            <i className="mr-[0.2rem]">x</i>
            <sup>2</sup>
          </button>
          <button
            className="operator flex items-center justify-center"
            type="button"
            title="Square root of x"
          >
            <svg
              className="h-3 w-3 fill-light-100 stroke-light-100"
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 32 32"
              viewBox="0 0 32 32"
              id="square-root"
            >
              <path d="M8,30c-0.416,0-0.7896-0.2578-0.9365-0.6489L4.3071,22H3c-0.5522,0-1-0.4478-1-1s0.4478-1,1-1h2c0.417,0,0.79,0.2588,0.9365,0.6489l1.9702,5.2539l7.1377-23.1968C15.1733,2.2861,15.561,2,16,2h13c0.5522,0,1,0.4478,1,1s-0.4478,1-1,1H16.7388L8.9556,29.2939c-0.1255,0.4092-0.4976,0.6929-0.9253,0.7056C8.02,30,8.0098,30,8,30z"></path>
            </svg>
            <span className="relative right-[0.3rem] text-sm">x</span>
          </button>
          <button className="operator text-2xl font-light" type="button">
            ÷
          </button>
          <button className="number" type="button">
            7
          </button>
          <button className="number" type="button">
            8
          </button>
          <button className="number" type="button">
            9
          </button>
          <button className="operator text-2xl font-light" type="button">
            ×
          </button>
          <button className="number" type="button">
            4
          </button>
          <button className="number" type="button">
            5
          </button>
          <button className="number" type="button">
            6
          </button>
          <button className="operator" type="button" title="a">
            <Image
              className="m-auto opacity-90"
              src="/icons/minus.png"
              width={18}
              height={18}
              alt="Minimize Icon"
            />
          </button>
          <button className="number" type="button">
            1
          </button>
          <button className="number" type="button">
            2
          </button>
          <button className="number" type="button">
            3
          </button>
          <button className="operator" type="button">
            +
          </button>
          <button className="number font-medium" type="button">
            <sup>+</sup>/-
          </button>
          <button className="number" type="button">
            0
          </button>
          <button className="number" type="button">
            ,
          </button>
          <button className="special grid place-items-center" type="button" title="a">
            <Image src="/icons/equals.png" width={20} height={20} alt="Equals Icon" />
          </button>
        </div>
      </div>
    </Rnd>
  );
};
