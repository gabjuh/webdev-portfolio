import React, { useState } from 'react';
import Point from './Point';

interface IBranch {
  height: number | null,
  step: number,
  size: number,
  side: string,
  // color: string | undefined,
  color: string | undefined,
  bgColor: string,
  strokeWidth: number,
  pos: number[],
  level: number;
  heightTillTop: number | null;
  levelDistanceReduction: number;
  open: string | undefined;
  openBranchIndexes: number[] | undefined;
  newBranchOn: {
    start: number;
    end: number | undefined;
  } | undefined;
}

const Branch: React.FC<IBranch> = ({
  height,
  step,
  size,
  side,
  color,
  bgColor,
  strokeWidth,
  pos,
  level,
  heightTillTop,
  levelDistanceReduction,
  open,
  openBranchIndexes,
  newBranchOn
}) => {

  // DRAWING ELEMENTS
  // Curve 90degs from the bottom to the right
  const curveBottomToRight: string = `
    q 0 -${size} ${size} -${size}
  `;

  // Curve 90degs from the left to the top
  const curveLeftToTop: string = `
    q ${size} 0 ${size} -${size}
  `;

  // Curve 90degs from the bottom to the left
  const curveBottomToLeft: string = `
    q 0 -${size} -${size} -${size}
  `;

  // Curve 90degs from the right to the top
  const curveRightToTop: string = `
    q -${size} 0 -${size} -${size}
  `;

  // Horisontal line to the left (sign = '-') or to the right (sign = ''),
  // length between the curves is based on the level value
  const straightLineHorisontal = (sign: '' | '-'): string => `
    ${level ? `l ${sign}${((1 - (level * levelDistanceReduction)) * size * 2 - (newBranchOn && sign === '' ? (newBranchOn.start * size * 2) : newBranchOn && sign === '-' ? (newBranchOn.end ? newBranchOn?.end : 0 * size * 2) : 0)) * (level)} 0` : ''}
  `;

  const straightLineHorisontalRight = () => `
  ${level ? `l ${0} 0` : ''}
`;

  const straightLineHorisontalLeft = () => `
  ${level ? `l -${0} 0` : ''}
`;

  //  - (newBranchOn && sign === '' ? (newBranchOn * size * 2) : 0)

  // Vertical line from the bottom to the bottom in the given height
  const straightLineVertical: string = `
    l 0 ${height ? (height * step + step) * 1 : step}
  `;

  // Draw a curve to the right
  // starting part of a right-side-branch
  // endinging part of a left-side-branch
  const curveRight: string = `
    ${curveBottomToRight}
    ${straightLineHorisontalRight()}
    ${curveLeftToTop}
    `;
    // ${straightLineHorisontal('')}

  // Draw a curve to the left
  // starting part of a left-side-branch
  // endinging part of a right-side-branch
  const curveLeft: string = `
    ${curveBottomToLeft}
    ${straightLineHorisontalLeft()}
    ${curveRightToTop}
    `;
    // ${straightLineHorisontal('-')}

  // LOGIC
  // Leave the end open to join it with the next branch, that no not have a start, if open set to 'end'
  const leaveOpenOrClose = (curveString: string) =>
    open === 'end' ?
      `l 0 -${step * .75}` :
      curveString;

  // Turn to the right if side is right,
  // if false, it is the left side, turn to the left
  const curveToDirection = () =>
    side === 'right' ?
      leaveOpenOrClose(open !== 'end' ? curveLeft : '') :
      leaveOpenOrClose(open !== 'end' ? curveRight : '');

  // Merge it to the timeline if branch has a finishing point
  const ifEnds: string = `
    ${straightLineVertical}
    ${curveToDirection()}
    `;

  // If branch has not a finishing point, so it is still active, it goes up to the top based on the remaining place to the top
  const lineIfNotEndedYet: string = `
    l 0 -${heightTillTop ? heightTillTop * step + size * 1.4 : step}
 `;

  //  Original starting point from the timeline
  const posStartingFromTimeline = `M ${pos[0]} ${pos[1]}`;

  // Changed position for continuing a previous branch on the left side
  const posContinuingPrevBranchLeft = `M ${pos[0] - (size * 2) * (level + 1)} ${pos[1] + size}`;

  // Changed position for continuing a previous branch on the right side
  const posContinuingPrevBranchRight = `M ${pos[0] + (size * 2) * (level + 1)} ${pos[1] + size}`;

  const posStartingOnExistingBranchRight = `M ${pos[0] + (size * (newBranchOn ? newBranchOn.start : 1) * 2)} ${pos[1]}`; // + (size * (newBranchOn ? newBranchOn : 1) * 2)

  const posStartingOnExistingBranchLeft = `M ${pos[0] - (size * (newBranchOn ? newBranchOn.start : 1) * 2)} ${pos[1]}`; //  - (size * (newBranchOn ? newBranchOn : 1) * 2)

  // If open set to 'start', set position on the right or left side,
  // if open is not start, give the original starting point
  const getPosition = () => {
    if (!newBranchOn) {
      return open === 'start' ?
        side === 'left' ?
          posContinuingPrevBranchLeft :
          posContinuingPrevBranchRight :
        posStartingFromTimeline;
    } else {
      return side === 'left' ?
        posStartingOnExistingBranchLeft :
        posStartingOnExistingBranchRight;
    }
  };

  const lineLengthToJoinOpenedBranches = openBranchIndexes ? openBranchIndexes[1] - openBranchIndexes[0] : 0;

  return (
    <>
      <path
        d={`
          ${getPosition()}
          ${side === 'right' ? open !== 'start' ? curveRight : `q 0 0 0 -${step - size}` : open !== 'start' ? curveLeft : `q 0 0 0 -${step - size}`}
          ${heightTillTop ? lineIfNotEndedYet :
            openBranchIndexes ? `q 0 0 0 -${(step - size) * lineLengthToJoinOpenedBranches + size}` : ifEnds}
        `}
        stroke={color ? color : 'lightgray'}
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Point at the very end of the line, if branch still active */}
      {heightTillTop && (
        <Point
          color={color}
          isMajor={true}
          bgColor={bgColor}
          pos={[side === 'right' ? pos[0] + size * 2 : pos[0] - size * 2, 0]}
          size={6}
          strokeWidth={1.5}
          level={level}
          levelDistanceReduction={levelDistanceReduction}
          isStillActive={!open && heightTillTop !== null}
        />
      )}
    </>
  );
};

export default Branch;