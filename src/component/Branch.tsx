import React, { useState } from 'react';

interface IBranch {
  height: number | null,
  step: number,
  size: number,
  side: string | undefined,
  color: string | undefined,
  strokeWidth: number,
  pos: number[],
  jumpToLevel: number;
}

const Branch: React.FC<IBranch> = ({
  height,
  step,
  size,
  side,
  color,
  strokeWidth,
  pos,
  jumpToLevel,
}) => {

  // The first line of code turns to the branch 90deg to the right, the third one 90deg to the left. The code in the middle makes it longer between, if jumpToLevel > 0
  const bendRight: string = `
   q 0 -${size} ${size} -${size}
   ${jumpToLevel ? `l ${((1 - (jumpToLevel * .15)) * size + size) * (jumpToLevel)} 0` : ''}
   q ${size} 0 ${size} -${size}
 `;

  // Same as above, but with different signs and direction
  const bendLeft: string = `
   q 0 -${size} -${size} -${size}
   ${jumpToLevel ? `l -${((1 - (jumpToLevel * .15)) * size + size) * (jumpToLevel)} 0` : ''}
   q -${size} 0 -${size} -${size}
 `;

  return (
    <>
      <path
        d={`
          M ${pos[0]} ${pos[1]}
          ${side === 'right' ? bendRight : bendLeft}
          l 0 -${height ? height * -1 * step : step}
          ${side === 'right' ? bendLeft : bendRight}
        `}
        stroke={color ? color : 'lightgray'}
        strokeWidth={strokeWidth}
        fill="none"
      />
    </>
  );
};

export default Branch;