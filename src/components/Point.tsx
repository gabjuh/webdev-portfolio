import React, { useEffect } from 'react';
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
  end?: number;
  open?: string | undefined;
  selectedPopupSlug?: string;
  rulerLength?: number;
  onClick?: any;
  inactive?: true;
  canceled?: boolean;
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
  end,
  open,
  selectedPopupSlug,
  rulerLength,
  onClick,
  inactive,
  canceled
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
  const [isSelected, setIsSelected] = React.useState(false);
  const isInactive: boolean = slug !== 'inactive'

  const handleMouseEnter = () => {
    isInactive && setIsOnHover(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsOnHover(false);
    }, 800);
  };

  const increasePointSize = () => {
    if (isOnHover || isSelected) {
      return pointSize * 1.5;
    } else {
      return pointSize;
    }
  };

  const isPointInactive = () =>
    inactive ||
    slug?.includes('generated') ||
    !end &&
    level &&
    !canceled &&
    open === 'start';

  const handleOnClick = () => {
    if (slug && isInactive && !isPointInactive()) {
      onClick(slug);
      setIsSelected(true);
      increasePointSize();
    }
  };

  useEffect(() => {
    slug && slug !== selectedPopupSlug ? setIsSelected(false) : setIsSelected(true);
  }, [selectedPopupSlug]);

  return (
    <>
      <g onClick={() => handleOnClick()}>
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
          r={!isPointInactive() ? increasePointSize() : pointSize}
        />

        <g
          id={slug}
          className={`${!isPointInactive() ? 'cursor-pointer' : ''}`}
          fill={'#0000'}
          strokeWidth='0'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => onClick}
        >
          {/* Clickable field, bigger than the other */}
          <circle
            onClick={() => handleOnClick()}
            cx={getCx()}
            cy={pos[1]}
            r={pointSize + 10}
          />
        </g>
      </g>
    </>
  );
};

export default Point;