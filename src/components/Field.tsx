import React, { useState } from 'react';

interface IField {
  name: string;
  img: string;
  size: number;
  isBigger: Boolean;
  pos: number[];
  color: string;
  i: number;
  showIndexes: Boolean;
  cols: number;
}

const Field: React.FC<IField> = ({
  name,
  img,
  size,
  isBigger,
  pos,
  color,
  i,
  showIndexes,
  cols
}) => {

  const increaseOpacity = (startOp: number, i: number) => startOp + i * 0.001;

  const generateFirstColor = (i: number, cols: number): string => {
    const [r, g, b, a] = [255 - i * 2, 255 - i, 255 - i * 3, increaseOpacity(0.3, i)];
    return `rgba(${r},${g},${b},${a})`;
  };

  const generateSecondColor = (i: number, cols: number): string => {
    const [r, g, b, a] = [200, 200, 192, increaseOpacity(0.3, i)];
    return `rgba(${r},${g},${b},${a})`;
  };

  // Get the last digit of the number or return the number if it is smaller than 10
  const getLastDigit = (nr: number): number => nr % 10;

  // Get the first digit of the number or return 0 if it is smaller than 10
  const getFirstDigit = (nr: number): number => Math.floor(nr / 10);

  const increaseNrWithIndex = (nr: number, index: number): number => nr + index;

  const [hovering, setHovering] = useState(false);

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  interface IStylesDefault {
    height: string,
    width: string,
    left: string,
    right: number,
    background: string;
    boxShadow: string;
  }

  interface IStylesOnHover {
    height: string,
    width: string,
    left: string,
    right: number,
    background: string;
    boxShadow: string;
  }

  const stylesDefault: IStylesDefault = {
    height: `${size}px`,
    width: `${size}px`,
    left: `${pos[0]}px`,
    right: 0,
    background: `linear-gradient(120deg, ${generateFirstColor(i, cols)}, ${generateSecondColor(i, cols)})`,
    boxShadow: `${increaseNrWithIndex(-5, getLastDigit(i))}px ${increaseNrWithIndex(-5, getFirstDigit(i))}px 3px rgba(56,97,109,.4)`
  };

  // console.log(`${increaseNrWithIndex(5, getLastDigit(i))}px ${increaseNrWithIndex(5, getFirstDigit(i))}px 10px rgba(56,97,109,.4)`);
  const stylesOnHover: IStylesOnHover = {
    height: `${size}px`,
    width: `${size}px`,
    left: `${pos[0]}px`,
    right: 0,
    background: `linear-gradient(120deg, ${generateFirstColor(i, cols)}, ${generateSecondColor(i, cols)})`,
    boxShadow: `${increaseNrWithIndex(-5, getLastDigit(i)) * 2}px ${increaseNrWithIndex(-5, getFirstDigit(i)) * 2}px 8px rgba(56,97,109,.4)`
  };

  // hover:shadow-[${decreaseNrWithIndex(5, i)}px_${decreaseNrWithIndex(5, i)}px_8px_rgba(56,97,109,.4)] 

  const fieldStyle: IStylesDefault | IStylesOnHover = hovering ? stylesOnHover : stylesDefault;

  return (
    <div
      className={`relative mx-auto rounded-2xl ${isBigger && 'col-span-2 row-span-2'} hover:-translate-y-[4px] hover:-translate-x-[1px] transition-all duration-200`}
      style={fieldStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="text-center h-[100%]">
        <div className="absolute top-[50%] -translate-y-[56%] left-0 right-0">
          <span className="absolute -top-3 left-1 text-[#999] text-[.6rem]">{showIndexes && i}</span>
          {/* <span className="text-[#666] text-xl">{name}</span> */}
          <img
            className="absolute w-[50%] left-0 right-0 mx-auto top-[50%] -translate-y-[50%]"
            style={{
              opacity: isBigger ? .75 : increaseOpacity(0.3, i)
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