import React, { useState } from 'react';

interface Bend {
  height: number,
  width: number,
  color: string,
  strokeWidth: number,
  level: number,
  startPos: number,
  direction: 'right' | 'left',
  bend: string[];
}

const Bend: React.FC<Bend> = ({
  height,
  width,
  color,
  strokeWidth,
  level,
  startPos,
  direction,
  bend
}) => {

  return (
    <svg height={height} width={width} className="">
      <path
        d={`
          M ${startPos - strokeWidth / 2} ${level}
          ${direction === 'right' ? bend[0] : bend[1]}
        `}
        stroke={color}
        stroke-width={strokeWidth}
        fill="none"
      />
    </svg>
  );
};

export default Bend;