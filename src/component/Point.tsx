import React from 'react';

interface IPoint {
  color: string;
  isMajor?: Boolean;
  bgColor: string;
}

const Point: React.FC<IPoint> = ({
  color,
  isMajor,
  bgColor,
}) => {

  return (
    <g stroke={color} strokeWidth="3" fill={bgColor} >
      <circle cx="100" cy="350" r="10" />
    </g>
  );
};

export default Point;