import React, { useState } from 'react';

interface ITimeline {
  height: number | string;
  timelineHorisontalPosition: number;
  color: string;
  strokeWidth: number;
  startPos?: number;
  isTimeline?: Boolean;
}

const Tube: React.FC<ITimeline> = ({
  height,
  timelineHorisontalPosition,
  color,
  strokeWidth,
  startPos,
  isTimeline,
}) => {

  // const [vertPos, setVertPos] = useState<number>(startPos ? startPos : 0);

  // M ${ !isStock ? vertPos + strokeWidth / 2 : vertPos; } ${ height; }

  return (
    <>
      <path
        d={`
            M ${timelineHorisontalPosition} ${height} 
            l 0 -${height}
          `}
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </>
  );
};

export default Tube;