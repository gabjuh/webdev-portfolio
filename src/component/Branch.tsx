import React, { useState } from 'react';
import Point from './Point';

interface IBranch {
  height: number | null,
  step: number,
  size: number,
  side: string,
  // color: string | undefined,
  color: string | undefined,
  strokeWidth: number,
  pos: number[],
  jumpToLevel: number;
  heightIfNotEndedYet: number | null;
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
  heightIfNotEndedYet,
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

  //  If branch has a finishing point, merge it to the timeline
  const ifEnds: string = `
    l 0 -${height ? height * -1 * step - step : step}
    ${side === 'right' ? bendLeft : bendRight}
  `;

  // If branch has not a finishing point, so it is still active, it goes up to the top based on the remaining place to the top
  const lineIfNotEndedYet: string = `
    l 0 -${heightIfNotEndedYet ? heightIfNotEndedYet * step + size : step}
 `;

  return (
    <>
      <path
        d={`
          M ${pos[0]} ${pos[1]}
          ${side === 'right' ? bendRight : bendLeft}
          ${heightIfNotEndedYet ? lineIfNotEndedYet : ifEnds}
        `}
        stroke={color ? color : 'lightgray'}
        strokeWidth={strokeWidth}
        fill="none"
      />
      {heightIfNotEndedYet && (
        <Point
          color={color}
          isMajor={true}
          bgColor={'#222'}
          pos={[side === 'right' ? pos[0] + size * 2 : pos[0] - size * 2, 0]}
          size={6}
          strokeWidth={1.5}
        />
      )}
    </>
  );
};

export default Branch;