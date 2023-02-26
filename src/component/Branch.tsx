import React, { useState } from 'react';
import Bend from './Bend';
import Tube from './Tube';
import Point from './Point';

interface IBranch {
  height: number,
  width: number,
  color: string,
  strokeWidth: number,
  level: number,
  startPos: number,
  direction: 'right' | 'left',
  bend: string[];
  bgColor: string;
}

const Branch: React.FC<IBranch> = ({
  height,
  width,
  color,
  strokeWidth,
  level,
  startPos,
  direction,
  bend,
  bgColor,
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
      <Point
        color={color}
        isMajor={true}
        bgColor={bgColor}
        pos={[50, 50]}
      />
    </>
  );
};

export default Branch;