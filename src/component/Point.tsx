import React from 'react';

interface IPoint {
  color: string;
  isMajor?: Boolean;
  bgColor: string;
  pos: number[];
  size: number;
  strokeWidth: number;
}

const Point: React.FC<IPoint> = ({
  color,
  isMajor,
  bgColor,
  pos,
  size,
  strokeWidth,
}) => {

  return (
    <g stroke={color} strokeWidth={isMajor ? strokeWidth : 0} fill={isMajor ? bgColor : color} >
      <circle cx={pos[0]} cy={pos[1]} r={size} />
    </g>
  );
};

export default Point;