import React from 'react';
import themes from '../themes.json';

interface IPoint {
  pos: number[];
  pointSize: number;
  strokeWidth: number;
  color: string | undefined;
  bgColor: string;
  side?: string | undefined;
  level?: number | undefined;
  levelDistanceReduction: number;
  branchWidth?: number;
  isMajor?: Boolean;
  isStillActive?: Boolean;
}

const Point: React.FC<IPoint> = ({
  pos,
  pointSize,
  strokeWidth,
  color,
  bgColor,
  side,
  level,
  levelDistanceReduction,
  branchWidth,
  isMajor,
  isStillActive
}) => {

  const width = branchWidth ? branchWidth : 0

  const getCx = () => {
    if (!isStillActive) {
      return side === 'left' ?
        pos[0] - width * (level ? level * 2 : 0) :
        pos[0] + width * (level ? level * 2 : 0);
    } else {
      return pos[0];
    }

  };

  return (
    <g className="transition-all duration-[800ms] ease-in-out" stroke={side ? themes[0].timeline : color} strokeWidth={isMajor ? strokeWidth : 0} fill={isMajor ? bgColor : color} >
      <circle cx={getCx()} cy={pos[1]} r={pointSize} />
    </g>
  );
};

export default Point;