import React, { useState } from 'react';

interface IBranch {
  id: string,
  height: number,
  width: number,
  size: number,
  side: string | undefined,
  color: string | undefined,
  strokeWidth: number,
  level: number,
  pos: number[],
  startPos: number,
  direction?: 'right' | 'left',
  bgColor: string;
  pointSize: number;
  pointStrokeWidth: number;
  jumpToLevel: number;
}

const Branch: React.FC<IBranch> = ({
  id,
  height,
  width,
  size,
  side,
  color,
  strokeWidth,
  level,
  pos,
  startPos,
  direction,
  bgColor,
  pointSize,
  pointStrokeWidth,
  jumpToLevel,
}) => {

  const [branchLength, setBranchLength] = useState<number>(3);
  // const isRight = direction === 'right';

  // The first line of code turns to the branch 90deg to the right, the third one 90deg to the left. The code in the middle makes it longer between, if jumpToLevel > 0
  const bendRight: string = `
   q 0 -${size} ${size} -${size}
   ${jumpToLevel ? `l ${size * jumpToLevel} 0` : ''}
   q ${size} 0 ${size} -${size}
 `;

  // Same as above, but with different signs and direction
  const bendLeft: string = `
   q 0 -${size} -${size} -${size}
   ${jumpToLevel ? `l -${size * jumpToLevel} 0` : ''}
   q -${size} 0 -${size} -${size}
 `;

  return (
    <>
      <path id={id}
        d={`
          M ${pos[0]} ${pos[1]}
          ${side === 'right' ? bendRight : bendLeft}
          l 0 -${height * branchLength}
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