import React, { useState } from 'react';

interface Bend {
  height: number,
  color: string,
  strokeWidth: number;
}

const Tube: React.FC<Bend> = ({
  height,
  color,
  strokeWidth,
}) => {

  return (
    <>
      <svg height={height} width={strokeWidth} className="">
        <path
          d={`
            M ${strokeWidth / 2} ${height} 
            l 0 -${height}
          `}
          stroke={color}
          stroke-width={strokeWidth} />
      </svg>
    </>
  );
};

export default Tube;