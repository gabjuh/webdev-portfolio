import React, { useState } from 'react';

interface IBranch {
  height: number,
  width: number,
  size: number,
  color: string,
  strokeWidth: number,
  level: number,
  startPos: number,
  direction: 'right' | 'left',
  bgColor: string;
  pointSize: number;
  pointStrokeWidth: number;
  jumpToLevel: number;
}

const Branch: React.FC<IBranch> = ({
  height,
  width,
  size,
  color,
  strokeWidth,
  level,
  startPos,
  direction,
  bgColor,
  pointSize,
  pointStrokeWidth,
  jumpToLevel,
}) => {

  const [branchLength, setBranchLength] = useState<number>(3);
  const isRight = direction === 'right';

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
      <svg
        width={width}
        height={height * branchLength + 55}
        className={`
          mx-auto 
          border
          box-content
          absolute
          left-0
          right-0
          bottom-[180px]
          translate-x-[16px]
        `}
        style={{
          transform: `${isRight ? 'translateX(16px)' : 'translateX(-12px)'}`
        }}
      >
        <path
          d={`
            M ${isRight ? strokeWidth / 2 : width - strokeWidth / 2} ${height * branchLength + 55}
            ${isRight ? bendRight : bendLeft}
            l 0 -${height * branchLength}
            ${isRight ? bendLeft : bendRight}
          `}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
        />

      </svg>
    </>
  );
};

export default Branch;