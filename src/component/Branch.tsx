import React, { useState } from 'react';
import Bend from './Bend';
import Tube from './Tube';

interface IBranch {
  height: number,
  width: number,
  color: string,
  strokeWidth: number,
  level: number,
  startPos: number,
  direction: 'right' | 'left',
  bend: string[];
}

const Branch: React.FC<IBranch> = ({
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
    <>
      <Bend
        height={height}
        width={width}
        color={color}
        strokeWidth={strokeWidth}
        level={level}
        startPos={startPos}
        direction={'left'}
        bend={[bend[0], bend[1]]}
      />
      <Tube
        height={300}
        branchWidth={width}
        color={color}
        strokeWidth={strokeWidth}
        direction={direction}
      />
      <Bend
        height={height}
        width={width}
        color={color}
        strokeWidth={strokeWidth}
        level={level}
        startPos={startPos}
        direction={direction}
        bend={[bend[0], bend[1]]}
      />
    </>
  );
};

export default Branch;