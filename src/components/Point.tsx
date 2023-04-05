import React from 'react';
import Ruler from './Ruler';
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
  slug?: string;
  selectedPopupSlug?: string;
  rulerLength?: number;
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
  isStillActive,
  slug,
  selectedPopupSlug,
  rulerLength
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

  const [isOnHover, setIsOnHover] = React.useState(false);

  const handleMouseEnter = () => {
    setIsOnHover(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsOnHover(false);
    }, 500);
  };

  const increasePointSize = () => {
    if (isOnHover) {
      return pointSize * 1.3;
    } else {
      return pointSize;
    }
  };


  return (
    <>
      <g>
        <Ruler
          showUp={slug && slug === selectedPopupSlug ? true : false}
          color={color}
          startPos={[getCx(), pos[1]]}
          slug={slug}
          rulerLength={rulerLength}
        />
      </g>
      {/* Point */}
      <g
        className={`transition-all duration-[800ms] ease-in-out`}
        stroke={side ? themes[0].timeline : color}
        strokeWidth={isMajor ? strokeWidth : 0}
        fill={isMajor ? bgColor : color}
      >
        {/* Viewable point */}
        <circle
          className="transition-all duration-150 ease-in-out"
          cx={getCx()}
          cy={pos[1]}
          r={increasePointSize()}
        />
        <g
          className={`cursor-pointer `}
          fill={'#0000'}
          strokeWidth='0'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Clickable field, bigger than the other */}
          <circle cx={getCx()} cy={pos[1]} r={pointSize + 10} />
        </g>
      </g>
    </>
  );
};

export default Point;