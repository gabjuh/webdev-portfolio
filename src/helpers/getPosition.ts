import { horisontalPositions, breakpoints } from "../data/positions/horisontalPositions";

type PositionType = 'popupPos' | 'titlePos' | 'textPos' | 'timelinePos' | 'yearPos';

// Get the horizontal position 
export const getPosition = (property: PositionType, viewWidth: number): number => {
  if (viewWidth >= breakpoints['2xl']) return horisontalPositions['2xl'][property];
  if (viewWidth >= breakpoints.xl) return horisontalPositions.xl[property];
  if (viewWidth >= breakpoints.lg) return horisontalPositions.lg[property];
  if (viewWidth >= breakpoints.md) return horisontalPositions.md[property];
  if (viewWidth >= breakpoints.sm) return horisontalPositions.sm[property];
  if (viewWidth >= breakpoints.xs) return horisontalPositions.xs[property];

  return 190;
};
