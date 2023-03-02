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
  open: string | undefined;
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
  open,
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

  // Leave the end open to join it with the next branch, that no not have a start, if open set to 'end'
  const leaveOpenOrClose = (bendString: string) =>
    open === 'end' ?
      `l 0 -${step * .75}` :
      bendString;

  // const startOpenOrFromTimeline = (bendString: string) =>
  //   open === 'start' ?
  //     ``

  // Turn to the right if side is right,
  // if false, it is the left side, turn to the left
  const bendToDirection = () =>
    side === 'right' ?
      leaveOpenOrClose(open !== 'end' ? bendLeft : '') :
      leaveOpenOrClose(open !== 'end' ? bendRight : '');

  // Merge it to the timeline if branch has a finishing point
  const ifEnds: string = `
    ${`l 0 ${height ? (height * step + step) * 1 : step}`}
    ${bendToDirection()}
    `;

  // If branch has not a finishing point, so it is still active, it goes up to the top based on the remaining place to the top
  const lineIfNotEndedYet: string = `
    l 0 -${heightIfNotEndedYet ? heightIfNotEndedYet * step + size * 1.3 : step}
 `;

  //  Original starting point from the timeline
  const posStartingFromTimeline = `M ${pos[0]} ${pos[1]}`;

  // Changed position for continuing a previous branch on the left side
  const posContinuingPrevBranchLeft = `M ${pos[0] - size * 2} ${pos[1] + size}`;

  // Changed position for continuing a previous branch on the right side
  const posContinuingPrevBranchRight = `M ${pos[0] + size * 2} ${pos[1] + size}`;

  // If open set to 'start', set position on the right or left side,
  // if open is not start, give the original starting point
  const getPosition = () =>
    open === 'start' ?
      side === 'left' ?
        posContinuingPrevBranchLeft :
        posContinuingPrevBranchRight :
      posStartingFromTimeline;

  return (
    <>
      <path
        d={`
          ${getPosition()}
          ${side === 'right' ? open !== 'start' ? bendRight : `q 0 0 0 -${step - size}` : open !== 'start' ? bendLeft : `q 0 0 0 -${step - size}`}
          ${heightIfNotEndedYet ? lineIfNotEndedYet : ifEnds}
        `}
        stroke={color ? color : 'lightgray'}
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Point at the very end of the line, if it still active */}
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