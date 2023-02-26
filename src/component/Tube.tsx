import React, { useState } from 'react';

interface Bend {
  height: number,
  branchWidth: number,
  color: string,
  strokeWidth: number;
  direction: 'right' | 'left',
}

const Tube: React.FC<Bend> = ({
  height,
  branchWidth,
  color,
  strokeWidth,
  direction
}) => {

  const margin = branchWidth - strokeWidth;

  return (
    <>
      <svg
        height={height}
        width={strokeWidth}
        // className={direction === 'right' ? `ml-[${margin}px]` : `mr-[128px]`}
        style={{
          marginLeft: direction === 'right' ? `${margin}px` : 0,
          marginRight: direction === 'left' ? `${margin}px` : 0
        }}
      >
        <path
          d={`
            M ${strokeWidth / 2} ${height} 
            l 0 -${height}
          `}
          stroke={color}
          strokeWidth={strokeWidth} />
      </svg>
    </>
  );
};

export default Tube;