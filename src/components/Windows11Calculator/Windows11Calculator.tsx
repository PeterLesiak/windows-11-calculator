'use client';

import { useState, useRef, useEffect, type ReactElement } from 'react';
import Image from 'next/image';

import { Rnd } from 'react-rnd';

import './styles.css';

export const enum Colors {
  RED = 'red',
  ORANGE = 'orange',
}

const enum BUTTON_TYPE {
  PERCENT = 'percent',
  CLEAR_ENTRY = 'clear_entry',
  CLEAR = 'clear',
  REMOVE_LAST = 'remove_last',

  ONE_OVER_X = 'one_over_x',
  SQUARE = 'square',
  SQRT = 'sqrt',
  DIVISION = 'division',

  DIGIT_7 = 'digit_7',
  DIGIT_8 = 'digit_8',
  DIGIT_9 = 'digit_9',
  MULTIPLICATION = 'multiplication',

  DIGIT_4 = 'digit_4',
  DIGIT_5 = 'digit_5',
  DIGIT_6 = 'digit_6',
  SUBTRACTION = 'subtraction',

  DIGIT_1 = 'digit_1',
  DIGIT_2 = 'digit_2',
  DIGIT_3 = 'digit_3',
  ADDITION = 'addition',

  SWITCH_SIGN = 'switch_sign',
  DIGIT_0 = 'digit_0',
  DECIMAL = 'decimal',
  EQUALS = 'equals',
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
  const toolbarButtonsRef = useRef<HTMLDivElement>(null);
  const minimizeRef = useRef<HTMLButtonElement>(null);
  const maximizeRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const minTextRef = useRef<HTMLDivElement>(null);
  const maxTextRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

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
  });

  useEffect(() => {
    if (!buttonsRef.current) return;

    const buttons = buttonsRef.current.querySelectorAll('button');
    const maxText = maxTextRef.current!;
    const minText = minTextRef.current!;

    let result = '0';

    const insertSymbol = (symbol: string): void => {
      result = `${result != '0' ? result : ''}${symbol}`;

      while (maxText.firstChild) {
        maxText.removeChild(maxText.lastChild as Node);
      }

      let lastChild: HTMLSpanElement | null = null,
        seenComma = false;
      for (let i = 0; i < result.length; ++i) {
        if (result[i] == ',') seenComma = true;

        const createNewElement =
          (((result.indexOf(',') == -1 ? result.length : result.indexOf(',')) - i) % 3 == 0 ||
            i == 0) &&
          !seenComma;

        if (createNewElement) {
          const element = document.createElement('span');
          element.textContent = result[i];
          maxText.appendChild(element);
          lastChild = element;

          continue;
        }

        lastChild!.textContent += result[i];
      }
    };

    buttons.forEach(button => {
      const buttonName = button.getAttribute('data-name') as BUTTON_TYPE;

      button.onclick = () => {
        switch (buttonName) {
          case BUTTON_TYPE.PERCENT:
            break;
          case BUTTON_TYPE.CLEAR_ENTRY:
            break;
          case BUTTON_TYPE.CLEAR:
            break;
          case BUTTON_TYPE.REMOVE_LAST:
            break;
          case BUTTON_TYPE.ONE_OVER_X:
            break;
          case BUTTON_TYPE.SQUARE:
            break;
          case BUTTON_TYPE.SQRT:
            break;
          case BUTTON_TYPE.DIVISION:
            break;
          case BUTTON_TYPE.DIGIT_7:
            insertSymbol('7');
            break;
          case BUTTON_TYPE.DIGIT_8:
            insertSymbol('8');
            break;
          case BUTTON_TYPE.DIGIT_9:
            insertSymbol('9');
            break;
          case BUTTON_TYPE.MULTIPLICATION:
            break;
          case BUTTON_TYPE.DIGIT_4:
            insertSymbol('4');
            break;
          case BUTTON_TYPE.DIGIT_5:
            insertSymbol('5');
            break;
          case BUTTON_TYPE.DIGIT_6:
            insertSymbol('6');
            break;
          case BUTTON_TYPE.SUBTRACTION:
            break;
          case BUTTON_TYPE.DIGIT_1:
            insertSymbol('1');
            break;
          case BUTTON_TYPE.DIGIT_2:
            insertSymbol('2');
            break;
          case BUTTON_TYPE.DIGIT_3:
            insertSymbol('3');
            break;
          case BUTTON_TYPE.ADDITION:
            break;
          case BUTTON_TYPE.SWITCH_SIGN:
            break;
          case BUTTON_TYPE.DIGIT_0:
            insertSymbol('0');
            break;
          case BUTTON_TYPE.DECIMAL:
            if (!result.includes(',')) insertSymbol(',');
            break;
          case BUTTON_TYPE.EQUALS:
            break;
        }
      };
    });
  }, []);

  return (
    <Rnd
      default={{ width: width, height: height, x, y }}
      minWidth={minimumWidth}
      minHeight={minimumHeight}
      disableDragging={!draggable}
    >
      <div
        className="flex h-full w-full cursor-default select-none flex-col rounded-lg border border-dark-200 bg-dark-700 shadow-[0px_15px_60px_-15px_#000]"
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
            <button
              className="flex w-[46px] hover:bg-dark-500"
              type="button"
              title="Minimize"
              ref={minimizeRef}
            >
              <Image
                className="m-auto invert"
                src="/icons/minimize.png"
                width={10}
                height={10}
                alt="Minimize Icon"
              />
            </button>
            <button
              className="flex hover:bg-dark-500"
              type="button"
              title="Maximize"
              ref={maximizeRef}
            >
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
              ref={closeRef}
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

        <div
          className="mt-[0.08rem] grid h-full grid-rows-6 gap-[0.125rem] px-1 pb-1 pt-[0.085rem] text-lg text-light-100 [grid-template-columns:repeat(4,1fr)] *:rounded-md"
          ref={buttonsRef}
        >
          <button className="operator font-extralight" type="button" data-name="percent">
            %
          </button>
          <button className="operator text-sm" type="button" data-name="clear_entry">
            CE
          </button>
          <button className="operator text-sm" type="button" data-name="clear">
            C
          </button>
          <button
            className="operator grid place-items-center"
            type="button"
            title="Clear last digit"
            data-name="remove_last"
          >
            <Image src="/icons/clear.png" width={15} height={15} alt="Clear" />
          </button>
          <button
            className="operator"
            type="button"
            title="1 Divided by X"
            data-name="one_over_x"
          >
            ⅟<i className="text-sm">x</i>
          </button>
          <button className="operator text-sm" type="button" data-name="square">
            <i className="mr-[0.2rem]">x</i>
            <sup>2</sup>
          </button>
          <button
            className="operator flex items-center justify-center"
            type="button"
            title="Square root of x"
            data-name="sqrt"
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
          <button className="operator text-2xl font-light" type="button" data-name="division">
            ÷
          </button>
          <button className="number" type="button" data-name="digit_7">
            7
          </button>
          <button className="number" type="button" data-name="digit_8">
            8
          </button>
          <button className="number" type="button" data-name="digit_9">
            9
          </button>
          <button
            className="operator text-2xl font-light"
            type="button"
            data-name="multiplication"
          >
            ×
          </button>
          <button className="number" type="button" data-name="digit_4">
            4
          </button>
          <button className="number" type="button" data-name="digit_5">
            5
          </button>
          <button className="number" type="button" data-name="digit_6">
            6
          </button>
          <button className="operator" type="button" title="Subtract" data-name="subtraction">
            <Image
              className="m-auto opacity-90"
              src="/icons/minus.png"
              width={18}
              height={18}
              alt="Minimize Icon"
            />
          </button>
          <button className="number" type="button" data-name="digit_1">
            1
          </button>
          <button className="number" type="button" data-name="digit_2">
            2
          </button>
          <button className="number" type="button" data-name="digit_3">
            3
          </button>
          <button className="operator" type="button" data-name="addition">
            +
          </button>
          <button className="number font-medium" type="button" data-name="switch_sign">
            <sup>+</sup>/<sub className="text-xl font-bold">-</sub>
          </button>
          <button className="number" type="button" data-name="digit_0">
            0
          </button>
          <button className="number" type="button" data-name="decimal">
            ,
          </button>
          <button
            className="special grid place-items-center"
            type="button"
            title="Equals"
            data-name="equals"
          >
            <Image src="/icons/equals.png" width={20} height={20} alt="Equals Icon" />
          </button>
        </div>
      </div>
    </Rnd>
  );
};
