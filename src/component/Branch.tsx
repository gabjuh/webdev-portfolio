import React, { useState } from 'react';
import Bend from './Bend';
import Tube from './Tube';

const Branch = () => {

  const [factor, setFactor] = useState<number>(4); // factor for sizing
  const sizeUnit: number = 15; // smallest unit to calc the size
  const size: number = factor * sizeUnit; // size is the sizeUnit multiplied by the factor
  const level: number = 2 * size; // level is actually the bright of the level of the branches
  const [jumpToLevel, setJumpToLevel] = useState<number>(2); // the number of how many braches will be jumped through
  const [strokeWidth, setStrokeWidth] = useState<number>(10); // simply the width of the Bend
  const [color, setColor] = useState<string>('lightgreen'); // color of the Bend
  const [direction, setDirection] = useState<'right' | 'left'>('right'); // direction of the bend

  const height: number = level; // height is 2 times the level (hight), always the same.
  const width: number = (level + strokeWidth) + jumpToLevel * size; // width is 2 times the level plus the strokeWidth, and if jumpToLevel !== 0, it will be multiplicated by the size
  const startPos: number = direction === 'right' ? strokeWidth : width; // set the starting position, default it is 0 + strokeWidht, or if direction is left, it is the width

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
      <Bend
        height={height}
        width={width}
        color={color}
        strokeWidth={strokeWidth}
        level={level}
        startPos={startPos}
        direction={direction}
        bend={[bendRight, bendLeft]}
      />
      <Tube
        height={500}
        color={color}
        strokeWidth={strokeWidth}
      />
    </>
  );
};

export default Branch;