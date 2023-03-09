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
    <path
      d={`
          M ${startPos - strokeWidth / 2} ${level}
          ${direction === 'right' ? bend[0] : bend[1]}
        `}
      stroke={color}
      strokeWidth={strokeWidth}
      fill="none"
    />
  );
};

export default Bend;