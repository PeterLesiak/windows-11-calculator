'use client';

import { useState, useRef, useEffect, type ReactElement } from 'react';
import Image from 'next/image';

import { Rnd } from 'react-rnd';

import './styles.css';

export const enum Colors {
  RED = 'red',
  ORANGE = 'orange',
}

const enum Operations {
  PERCENT,
  INVERSE,
  SQUARE,
  SQUARE_ROOT,
  DIVISION,
  MULTIPLICATION,
  SUBTRACTION,
  ADDITION,
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
  const [width, setWidth] = useState(props.width ?? minimumWidth);
  const [height, setHeight] = useState(props.height ?? minimumHeight);
  const [x, setX] = useState(props.x ?? 0);
  const [y, setY] = useState(props.y ?? 0);
  const [color] = useState(props.color ?? Colors.RED);
  const [visible, setVisible] = useState(false);

  const [draggable, setDraggable] = useState(false);

  const calculatorRef = useRef<HTMLDivElement>(null);

  const toolbarRef = useRef<HTMLDivElement>(null);
  const toolbarButtonsRef = useRef<HTMLDivElement>(null);

  const minTextRef = useRef<HTMLDivElement>(null);
  const maxTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setX((window.innerWidth - width) / 2);
    setY((window.innerHeight - height) / 2);

    setVisible(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const calculator = calculatorRef.current;

    if (calculator) {
      calculator.setAttribute(
        'style',
        `--clr-current-accent: var(--clr-accent-${color}); --clr-current-highlite: var(--clr-highlite-${color})`,
      );
    }
  }, [color]);

  useEffect(() => {
    window.addEventListener('mouseover', e => {
      const element = toolbarRef.current;
      const toolbarButtons = toolbarButtonsRef.current;

      if (!element || !toolbarButtons) return;

      setDraggable(
        element.contains(e.target as Node) && !toolbarButtons.contains(e.target as Node),
      );
    });

    window.addEventListener('mousedown', e => {
      const element = calculatorRef.current;

      if (!element) return;

      if (element.contains(e.target as Node)) {
        element.style.borderColor = 'var(--clr-current-accent)';
        element.style.boxShadow = '0px 15px 60px -5px #000';

        return;
      }

      element.style.borderColor = '';
      element.style.boxShadow = '';
    });
  }, []);

  let result = '0';

  let minResult = '';

  let firstNumber = '';
  let operation: Operations | undefined;
  let secoundNumber = '';

  const updateMaxText = (): void => {
    console.log('Max text: ', result);
  };

  const updateMinText = (): void => {
    console.log('Min text: ', minResult, ' Operation: ', operation);
  };

  const insertDigit = (digit: number): void => {
    result = `${result != '0' ? result : ''}${digit}`;

    updateMaxText();
  };

  const insertComma = (): void => {
    if (result.includes(',')) return;

    result += ',';

    updateMaxText();
  };

  const switchSign = (): void => {
    result = result[0] == '-' ? result.substring(1) : `-${result}`;

    updateMaxText();
  };

  const backspace = (): void => {
    if (
      result.length == 1 ||
      (result.length == 2 && result[0] == '-' && result[1] != ',') ||
      result == '-0,'
    ) {
      result = '0';
    } else {
      result = result.substring(0, result.length - 1);
    }

    updateMaxText();
  };

  const clearEntry = (): void => {
    result = '0';

    updateMaxText();
  };

  const clearAll = (): void => {
    result = '0';
    updateMinText();

    minResult = '';
    operation = undefined;
    updateMaxText();
  };

  const stringifyInverse = (num: string): string => `1/( ${num} )`;
  const stringifySquare = (num: string): string => `sqr( ${num} )`;
  const stringifySquareRoot = (num: string): string => `√( ${num} )`;
  const stringifyPercent = (num1: string, num2?: string): string => {
    return num2 ? `${num1} % ${num2}` : `${num1} %`;
  };
  const stringifyDivision = (num1: string, num2?: string): string => {
    return num2 ? `${num1} ÷ ${num2}` : `${num1} ÷`;
  };
  const stringifyMultiplication = (num1: string, num2?: string): string => {
    return num2 ? `${num1} × ${num2}` : `${num1} ×`;
  };
  const stringifySubtraction = (num1: string, num2?: string): string => {
    return num2 ? `${num1} - ${num2}` : `${num1} -`;
  };
  const stringifyAddition = (num1: string, num2?: string): string => {
    return num2 ? `${num1} + ${num2}` : `${num1} +`;
  };

  const evaluate = (operation: Operations, num1: number, num2: number): number => {
    switch (operation) {
      case Operations.PERCENT:
        return 0;
      case Operations.INVERSE:
        return 0;
      case Operations.SQUARE:
        return 0;
      case Operations.SQUARE_ROOT:
        return 0;
      case Operations.DIVISION:
        return num1 / num2;
      case Operations.MULTIPLICATION:
        return num1 * num2;
      case Operations.SUBTRACTION:
        return num1 - num2;
      case Operations.ADDITION:
        return num1 + num2;
    }
  };

  const handleOperation = (newOperation: Operations): void => {
    if (operation) operation = newOperation;
    updateMinText();

    result = '0';
    updateMaxText();
  };

  const handleEquals = (): void => {
    switch (operation) {
      case Operations.PERCENT:
        break;
      case Operations.INVERSE:
        break;
      case Operations.SQUARE:
        break;
      case Operations.SQUARE_ROOT:
        break;
      case Operations.DIVISION:
        minResult = stringifyDivision(firstNumber, result);
        break;
      case Operations.MULTIPLICATION:
        minResult = stringifyMultiplication(firstNumber, result);
        break;
      case Operations.SUBTRACTION:
        minResult = stringifySubtraction(firstNumber, result);
        break;
      case Operations.ADDITION:
        minResult = stringifyAddition(firstNumber, result);
        break;

      default:
        throw new Error(`unrecognized operation: ${operation}`);
    }

    updateMinText();

    const num1 = +firstNumber.replace(',', '.');
    const num2 = +result.replace(',', '.');
    result = String(evaluate(operation, num1, num2)).replace('.', ',');
    updateMaxText();
    result = '0';
  };

  return (
    <Rnd
      position={{ x, y }}
      size={{ width, height }}
      minWidth={minimumWidth}
      minHeight={minimumHeight}
      disableDragging={!draggable}
      onDragStop={(_, data) => {
        setX(data.x);
        setY(data.y);
      }}
      onResizeStop={(e, dir, element, delta, position) => {
        setWidth(width + delta.width);
        setHeight(height + delta.height);

        setX(position.x);
        setY(position.y);
      }}
    >
      <div
        className={`${visible ? 'opacity-100' : 'pointer-events-none opacity-0'} flex h-full w-full cursor-default select-none flex-col rounded-lg border border-dark-200 bg-dark-700 shadow-[0px_15px_60px_-15px_#000] transition-opacity duration-150 ease-linear`}
        ref={calculatorRef}
      >
        <div className="flex h-[53.5px] pl-[18px]" ref={toolbarRef}>
          <div className="mb-auto mt-auto">
            <Image src="/icons/calculator.png" width={17} height={17} alt="Calculator Icon" />
          </div>
          <div className="mb-auto ml-[13px] mt-auto text-xs tracking-wide text-light-100">
            Calculator
          </div>
          <div
            className="ml-auto grid [grid-template-columns:repeat(3,1fr)]"
            ref={toolbarButtonsRef}
          >
            <button className="flex w-[46px] hover:bg-dark-500" type="button" title="Minimize">
              <Image
                className="m-auto invert"
                src="/icons/minimize.png"
                width={10}
                height={10}
                alt="Minimize Icon"
              />
            </button>
            <button className="flex hover:bg-dark-500" type="button" title="Maximize">
              <Image
                className="m-auto invert"
                src="/icons/square.png"
                width={11}
                height={11}
                alt="Maximize Icon"
              />
            </button>
            <button
              className="flex rounded-tr-lg hover:bg-red"
              type="button"
              title="Close"
              onClick={() => setVisible(false)}
            >
              <Image
                className="m-auto invert"
                src="/icons/close.png"
                width={14}
                height={14}
                alt="Close Icon"
              />
            </button>
          </div>
        </div>

        <div className="mt-[7px] flex pl-1 pr-2">
          <div className="mb-auto mt-auto flex h-9 w-10 rounded-md hover:bg-dark-600">
            <Image
              className="m-auto"
              src="/icons/hamburger menu.png"
              width={17}
              height={17}
              alt="Toogle Menu Icon"
            />
          </div>
          <div className="mb-auto ml-1 mt-auto h-8 text-xl font-semibold tracking-[0.015em] text-light-100">
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

        <div className="mt-[4px] flex flex-col">
          <div
            className="flex h-[1.1rem] justify-end gap-x-[3px] pr-[18px] text-sm font-medium text-light-500"
            ref={minTextRef}
          ></div>
          <div
            className="flex cursor-text select-text justify-end gap-x-[0.65rem] pr-[0.8rem] text-[2.9rem] font-semibold tracking-[0.003em] text-light-100"
            ref={maxTextRef}
          >
            <span>0</span>
          </div>
        </div>

        <div className="mt-[6px] flex h-12 content-center items-center justify-between text-[13px] text-light-700 *:flex *:h-full *:items-center *:rounded-[0.25rem] *:px-[16px] *:transition-colors">
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
              className="mb-[1.5px] mr-1"
            >
              <path
                fill="currentColor"
                d="M12 14.379q-.162 0-.298-.053t-.267-.184L7.046 9.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16L12 13.292l4.246-4.246q.14-.14.344-.15t.364.15t.16.354t-.16.354l-4.389 4.388q-.13.131-.267.184q-.136.053-.298.053"
              />
            </svg>
          </div>
        </div>

        <div className="mt-[0.08rem] grid h-full grid-rows-6 gap-[0.125rem] px-1 pb-1 pt-[0.085rem] text-lg text-light-100 [grid-template-columns:repeat(4,1fr)] *:rounded-md">
          <button
            className="operator font-extralight"
            type="button"
            onClick={() => handleOperation(Operations.PERCENT)}
          >
            %
          </button>
          <button className="operator text-sm" type="button" onClick={clearEntry}>
            CE
          </button>
          <button className="operator text-sm" type="button" onClick={clearAll}>
            C
          </button>
          <button
            className="operator grid place-items-center"
            type="button"
            title="Clear last digit"
            onClick={backspace}
          >
            <Image src="/icons/clear.png" width={15} height={15} alt="Clear" />
          </button>
          <button
            className="operator"
            type="button"
            title="1 Divided by X"
            data-name="one_over_x"
            onClick={() => handleOperation(Operations.INVERSE)}
          >
            ⅟<i className="text-sm">x</i>
          </button>
          <button
            className="operator text-sm"
            type="button"
            onClick={() => handleOperation(Operations.SQUARE)}
          >
            <i className="mr-[0.2rem]">x</i>
            <sup>2</sup>
          </button>
          <button
            className="operator flex items-center justify-center"
            type="button"
            title="Square root of x"
            onClick={() => handleOperation(Operations.SQUARE_ROOT)}
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
          <button
            className="operator text-2xl font-light"
            type="button"
            onClick={() => handleOperation(Operations.DIVISION)}
          >
            ÷
          </button>
          <button className="number" type="button" onClick={() => insertDigit(7)}>
            7
          </button>
          <button className="number" type="button" onClick={() => insertDigit(8)}>
            8
          </button>
          <button className="number" type="button" onClick={() => insertDigit(9)}>
            9
          </button>
          <button
            className="operator text-2xl font-light"
            type="button"
            onClick={() => handleOperation(Operations.MULTIPLICATION)}
          >
            ×
          </button>
          <button className="number" type="button" onClick={() => insertDigit(4)}>
            4
          </button>
          <button className="number" type="button" onClick={() => insertDigit(5)}>
            5
          </button>
          <button className="number" type="button" onClick={() => insertDigit(6)}>
            6
          </button>
          <button
            className="operator"
            type="button"
            title="Subtract"
            onClick={() => handleOperation(Operations.SUBTRACTION)}
          >
            <Image
              className="m-auto opacity-90"
              src="/icons/minus.png"
              width={18}
              height={18}
              alt="Minimize Icon"
            />
          </button>
          <button className="number" type="button" onClick={() => insertDigit(1)}>
            1
          </button>
          <button className="number" type="button" onClick={() => insertDigit(2)}>
            2
          </button>
          <button className="number" type="button" onClick={() => insertDigit(3)}>
            3
          </button>
          <button
            className="operator"
            type="button"
            onClick={() => handleOperation(Operations.ADDITION)}
          >
            +
          </button>
          <button className="number font-medium" type="button" onClick={switchSign}>
            <sup>+</sup>/<sub className="text-xl font-bold">-</sub>
          </button>
          <button className="number" type="button" onClick={() => insertDigit(0)}>
            0
          </button>
          <button className="number" type="button" onClick={insertComma}>
            ,
          </button>
          <button
            className="special grid place-items-center"
            type="button"
            title="Equals"
            onClick={handleEquals}
          >
            <Image src="/icons/equals.png" width={20} height={20} alt="Equals Icon" />
          </button>
        </div>
      </div>
    </Rnd>
  );
};
