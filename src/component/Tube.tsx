import React, { useState } from 'react';

interface ITune {
  height: number | string,
  branchWidth: number,
  color: string,
  strokeWidth: number;
  direction: 'right' | 'left',
  startPos?: number,
  isStock?: Boolean,
}

const Tube: React.FC<ITune> = ({
  height,
  branchWidth,
  color,
  strokeWidth,
  direction,
  startPos,
  isStock,
}) => {

  const [vertPos, setVertPos] = useState<number>(startPos ? startPos : 0);

  return (
    <>
      <path
        d={`
            M ${!isStock ? vertPos + strokeWidth / 2 : vertPos} ${height} 
            l 0 -${height}
          `}
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </>
  );
};

export default Tube;