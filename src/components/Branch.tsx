import React, { useState } from 'react';
import Point from './Point';

interface IBranch {
  height: number | null,
  step: number,
  size: number,
  side: string,
  color?: string,
  bgColor: string,
  strokeWidth: number,
  pos: number[],
  level: number;
  heightTillTop: number | null;
  levelDistanceReduction: number;
  open?: string;
  openBranchIndexes?: number[];
  newBranchOn?: {
    start: number;
    end?: number;
  };
  pointStrokeWidth: number;
  pointSize: number;
  end?: number;
  canceled?: boolean;
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
  newBranchOn,
  pointStrokeWidth,
  pointSize,
  end,
  canceled
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

  const lineToRight = (value: number = 0): string => `
    ${level ? `l ${value - 1 * size + size} 0` : ''}
  `;
  
  const lineToLeft = (value: number = 0): string => `
    ${level ? `l -${value - 1 * size + size} 0` : ''}
  `;

  // Vertical line from the bottom to the top in the given height
  const straightLineVertical: string = `
    l 0 ${height ? (height * step + step) : step}
  `;

  // Draw a curve to the right
  // starting part of a right-side-branch
  // endinging part of a left-side-branch
  const curveRight: string = `
    ${curveBottomToRight}
    ${lineToRight(side === 'right' ? 0 : newBranchOn?.end ? newBranchOn.end * size : end ? end * size : 0)}
    ${curveLeftToTop}
    `;
    // ${straightLineHorisontal('')}

  // Draw a curve to the left
  // starting part of a left-side-branch
  // endinging part of a right-side-branch
  const curveLeft: string = `
    ${curveBottomToLeft}
    ${lineToLeft(side === 'left' ? 0 : newBranchOn?.end ? newBranchOn.end * size * -1 + size : end ? end * size * -1 : 0)}
    ${curveRightToTop}
    `;
    // ${lineToLeft(side === 'left' ? newBranchOn?.start && level - newBranchOn.start : newBranchOn?.end && newBranchOn.end - level)}
    // ${straightLineHorisontal('-')}

  // LOGIC
  // Leave the end open to join it with the next branch, that no not have a start, if open set to 'end'
  const leaveOpenOrClose = (curveString: string) =>
    open === 'end' ?
      `l 0 -${step}` :
      open !== 'both' ? curveString : '';

  // Turn to the right if side is right,
  // if false, it is the left side, turn to the left
  const curveToDirection = () =>
    side === 'right' && leaveOpenOrClose(open !== 'end' ? curveLeft : '') ||
    side === 'left' && leaveOpenOrClose(open !== 'end' ? curveRight : '')

  // Merge it to the timeline if branch has a finishing point
  const ifEnds: string = `
    ${straightLineVertical}
    ${curveToDirection()}
    `;

  // If branch has not a finishing point, so it is still active, it goes up to the top based on the remaining place to the top
  const lineIfNotEndedYet: string = `
    l 0 -${heightTillTop ? heightTillTop * step + size * 4 : 0}
 `;

  // POSITIONS  
  //  Original starting point from the timeline
  const posStartingFromTimeline = `M ${pos[0]} ${pos[1]}`;

  // Changed position for continuing a previous branch on the left side
  const posContinuingPrevBranchLeft = `M ${pos[0] - (size * 2) * (level + 1)} ${pos[1] + size + 7 - level * 6
    }`;

  // Changed position for continuing a previous branch on the right side
  // const posContinuingPrevBranchRight = `M ${pos[0] + (size * 2) * (level + 1)} ${pos[1] + size}`;
  const posContinuingPrevBranchRight = `M ${pos[0] + (size * 2) * (level + 1)} ${pos[1] + size + 7 - level * 6}`;

  const posStartingOnExistingBranchRight = `M ${pos[0] + (size * (newBranchOn ? newBranchOn.start : 1) * 2)} ${pos[1]}`; // + (size * (newBranchOn ? newBranchOn : 1) * 2)

  const posStartingOnExistingBranchLeft = `M ${pos[0] - (size * (newBranchOn ? newBranchOn.start : 1) * 2)} ${pos[1]}`; //  - (size * (newBranchOn ? newBranchOn : 1) * 2)

  const posAndLineWithOpenBothLeft = `M ${pos[0] - (size * 2) * (level + 1)} ${pos[1] + size * 1.2} 
  l 0 -${step + step * .5}`;

  const posAndLineWithOpenBothRight = `M ${pos[0] + (size * 2) * (level + 1)} ${pos[1] + size * 1.2} 
  l 0 -${step + step * .5}`

  // If open set to 'start', set position on the right or left side,
  // if open is not start, give the original starting point
  const getPosition = () => {
    if (newBranchOn === undefined) {
       if (open === 'start') {
        return side === 'left' ?
           posContinuingPrevBranchLeft :
           posContinuingPrevBranchRight 
        } if (open === 'both') {
          return side === 'left' ?
            posAndLineWithOpenBothLeft :
            posAndLineWithOpenBothRight
        } else {
          return posStartingFromTimeline;
        }
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
        className="transition-all duration-[800ms] ease-in-out"
        d={`
          ${getPosition()}
          ${open === 'both' ? '' : side === 'right' ? open !== 'start' ? curveRight : `q 0 0 0 -${step - size}` : open !== 'start' ? curveLeft : `q 0 0 0 -${step - size}`}
          ${heightTillTop ? open === 'both' ? '' : !canceled && lineIfNotEndedYet :
            openBranchIndexes ? `q 0 0 0 -${(step + 5 - size) * lineLengthToJoinOpenedBranches + size}` : ifEnds}
        `}
        stroke={color ? color : 'lightgray'}
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Point at the very end of the line, if branch still active */}
      {heightTillTop && open !== 'both' && !canceled && (
        <Point
          color={color}
          isMajor={true}
          bgColor={bgColor}
          pos={[side === 'right' ? pos[0] + size * 2 : pos[0] - size * 2, 0]}
          pointSize={pointSize}
          strokeWidth={pointStrokeWidth}
          level={level}
          levelDistanceReduction={levelDistanceReduction}
          isStillActive={!open && heightTillTop !== null}
        />
      )}
    </>
  );
};

export default Branch;