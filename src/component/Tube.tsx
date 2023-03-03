import React, { useState } from 'react';

interface ITune {
  height: number | string;
  verticalPosition: number;
  color: string;
  strokeWidth: number;
  startPos?: number;
  isStock?: Boolean;
}

const Tube: React.FC<ITune> = ({
  height,
  verticalPosition,
  color,
  strokeWidth,
  startPos,
  isStock,
}) => {

  // const [vertPos, setVertPos] = useState<number>(startPos ? startPos : 0);

  // M ${ !isStock ? vertPos + strokeWidth / 2 : vertPos; } ${ height; }

  return (
    <>
      <path
        d={`
            M ${verticalPosition} ${height} 
            l 0 -${height}
          `}
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </>
  );
};

export default Tube;