
// Horizontal position of the title and popup
export const horisontalPositions = {
  sm: {
    breakpoint: 470,
    timeline: 300,
    titlePos: 0,
    popupPos: - 175,
    textPos: 0
  },
  md: {
    breakpoint: 860,
    timeline: 300,
    titlePos: - 51,
    popupPos: 115,
    textPos: - 51
  },
  lg: {
    breakpoint: 1100,
    timeline: 300,
    titlePos: - 45,
    popupPos: 450,
    textPos: - 45
  },
  xl: {
    breakpoint: 1400,
    timeline: 300,
    titlePos: 30,
    popupPos: 570,
    textPos: 30
  }
};

// Breakpoints for the view width
export const breakpoints = {
  sm: horisontalPositions.sm.breakpoint,
  md: horisontalPositions.md.breakpoint,
  lg: horisontalPositions.lg.breakpoint,
  xl: horisontalPositions.xl.breakpoint
};

