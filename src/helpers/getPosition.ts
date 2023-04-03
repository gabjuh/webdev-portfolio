import { horisontalPositions, breakpoints } from "../data/positions/horisontalPositions";

type PositionType = 'popupPos' | 'titlePos' | 'textPos' | 'timelinePos';

// Get the horizontal position 
export const getPosition = (property: PositionType, viewWidth: number): number => {
  if (viewWidth >= breakpoints.xl) return horisontalPositions.xl[property];
  if (viewWidth >= breakpoints.lg) return horisontalPositions.lg[property];
  if (viewWidth >= breakpoints.md) return horisontalPositions.md[property];
  if (viewWidth >= breakpoints.sm) return horisontalPositions.sm[property];

  return 190;
};
