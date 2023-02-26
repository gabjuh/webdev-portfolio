import React from 'react';

interface IPoint {
  color: string;
  isMajor?: Boolean;
  bgColor: string;
  pos: number[];
}

const Point: React.FC<IPoint> = ({
  color,
  isMajor,
  bgColor,
  pos,
}) => {

  return (
    <g stroke={color} strokeWidth="3" fill={bgColor} >
      <circle cx={pos[0]} cy={pos[1]} r="10" />
    </g>
  );
};

export default Point;