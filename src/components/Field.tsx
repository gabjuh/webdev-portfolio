import React, { useEffect, useState } from 'react';

interface IField {
  name: string;
  img: string;
  size: number[];
  isBig: Boolean;
  type: 'empty' | 'normal' | 'smallWithIco' | '2x1' | '2x2' | 'button';
  pos: number[];
  color: string;
  i: number;
  showIndexes: Boolean;
  cols: number;
  activeField: number | null;
  setActiveField: (i: number | null) => void;
  nrOfFields: number;
  fn?: {
    scrollToId: (id: string) => void;
    id: string;
  } | null;
  isLicensed?: boolean;
}

const Field: React.FC<IField> = ({
  name,
  img,
  size,
  isBig,
  type,
  pos,
  color,
  i,
  showIndexes,
  cols,
  activeField,
  setActiveField,
  nrOfFields,
  fn,
  isLicensed
}) => {

  const increaseOpacity = (startOp: number, i: number) => startOp + i * 0.001;

  const setGradientBase = (colorValue: number, index: number): number => (255 - colorValue) / nrOfFields * index + colorValue;

  const generateFirstColor = (i: number, cols: number): string => {
    const [r, g, b, a] = [setGradientBase(25, i), setGradientBase(175, i), setGradientBase(117, i), increaseOpacity(0.3, i)];
    return `rgba(${r},${g},${b},${a})`;
  };

  const generateSecondColor = (i: number, cols: number): string => {
    const [r, g, b, a] = [setGradientBase(120, i), setGradientBase(192, i), setGradientBase(192, i), increaseOpacity(0.3, i)];
    return `rgba(${r},${g},${b},${a})`;
  };

  // Get the last digit of the number or return the number if it is smaller than 10
  const getLastDigit = (nr: number): number => nr % cols;

  // Get the first digit of the number or return 0 if it is smaller than 10
  const getFirstDigit = (nr: number): number => Math.floor(nr / cols);

  const increaseNrWithIndex = (nr: number, index: number, fineTuning: number = 1): number => (nr + index) * fineTuning;

  const handleMouseEnter = () => {
    setFieldStyle(stylesOnHover)
  };

  const handleMouseLeave = () => {
    setActiveField(null)
    setTimeout(() => {
      setFieldStyle(stylesDefault)
    }, 700)
  };

  const handleOnMouseDown = () => {
    setFieldStyle(stylesOnClick)
    setActiveField(activeField === null ? i : null)
  }

  const handleOnMouseUp = () => {
    setFieldStyle(stylesOnHover)
  };

  const handleOnClick = () => {
    setFieldStyle(stylesOnClick);
    // setActiveField(null);
  }

  interface IFieldStyles {
    width: string,
    height: string,
    left: string,
    right: number,
    background: string;
    boxShadow: string;
    transform?: string;
    transitionDuration: string;
  }

  const stylesDefault: IFieldStyles = {
    width: `${size[0]}px`,
    height: `${size[1]}px`,
    left: `${pos[0]}px`,
    right: 0,
    background: `linear-gradient(120deg, ${generateFirstColor(i, cols)}, ${generateSecondColor(i, cols)})`,
    boxShadow: `${increaseNrWithIndex(-5, getLastDigit(i), .4)}px ${increaseNrWithIndex(-5, getFirstDigit(i), .3)}px 4px rgba(56,97,109,${increaseOpacity(0.45, i)})`,
    transitionDuration: "600ms",
  };

  const stylesOnHover: IFieldStyles = {
    width: `${size[0]}px`,
    height: `${size[1]}px`,
    left: `${pos[0]}px`,
    right: 0,
    background: `linear-gradient(120deg, ${generateFirstColor(i, cols)}, ${generateSecondColor(i, cols)})`,
    boxShadow: `${increaseNrWithIndex(-5, getLastDigit(i), 1.1)}px ${increaseNrWithIndex(-5, getFirstDigit(i), 1.1)}px 6px rgba(56,97,109,${increaseOpacity(0.45, i)})`,
    transform: `translateY(${-4}px) translateX(${-1}px)`,
    transitionDuration: "150ms",
  };

  const stylesOnClick: IFieldStyles = {
    width: `${size[0]}px`,
    height: `${size[1]}px`,
    left: `${pos[0]}px`,
    right: 0,
    background: `linear-gradient(120deg, ${generateFirstColor(i, cols)}, ${generateSecondColor(i, cols)})`,
    boxShadow: `${increaseNrWithIndex(-5, getLastDigit(i), .4)}px ${increaseNrWithIndex(-5, getFirstDigit(i), .4)}px 4px rgba(56,97,109,${increaseOpacity(0.45, i)})`,
    transform: `translateY(${2}px) translateX(${1}px)`,
    transitionDuration: "100ms",
  };

  const [fieldStyle, setFieldStyle] = useState<IFieldStyles>(stylesDefault);

  return (
    <div
      className={`${isBig ? 'col-span-2 row-span-2 ' : ''}${!isLicensed && img ? 'border-red-500 border-[3px] ' : ''}relative group mx-auto rounded-2xl hover:-translate-y-[4px] hover:-translate-x-[1px] transition-all group`}
      style={fieldStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleOnMouseDown}
      onMouseUp={!fn ? handleOnMouseUp : () => fn.scrollToId(fn.id)}
      // onClick={handleOnClick}
    >
      <div className="text-center h-[100%]">
        <div className="absolute top-[50%] -translate-y-[56%] left-0 right-0">
          <span className="absolute -top-3 left-1 text-[#999] text-[.6rem]">{showIndexes && i}</span>
          <img
            className={`absolute max-w-[50%] group-hover:!opacity-1)] transition-all duration-200 left-0 right-0 mx-auto top-[50%] -translate-y-[50%] group-hover:drop-shadow-[0_0_10px_rgba(50,255,235,.4)] ${name === 'arrow down' ? '!w-[15px]' : ''}`}
            style={{
              opacity: isBig ? .85 : increaseOpacity(0.6, i)
            }}
            src={img}
            alt={name}
          />
        </div>
      </div>
    </div>
  );
};

export default Field;