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
  bend: string[];
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
  bend,
  bgColor,
  pointSize,
  pointStrokeWidth,
  jumpToLevel,
}) => {

  const [branchLength, setBranchLength] = useState<number>(3);
  const isRight = direction === 'right';

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
            ${isRight ? bend[0] : bend[1]}
            l 0 -${height * branchLength}
            ${isRight ? bend[1] : bend[0]}
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