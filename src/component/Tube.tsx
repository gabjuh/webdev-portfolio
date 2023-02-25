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
      <svg height={height} className="ml-1 p-0 border">
        <path d="M 0 350 l 150 -300" stroke="red" stroke-width="3" />
      </svg>
    </>
  );
};

export default Tube;