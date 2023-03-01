import React, { useState } from 'react';

interface ITune {
  height: number | string,
  color: string,
  strokeWidth: number;
  startPos?: number,
  isStock?: Boolean,
}

const Tube: React.FC<ITune> = ({
  height,
  color,
  strokeWidth,
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