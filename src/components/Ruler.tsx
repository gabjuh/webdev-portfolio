import React from 'react';

interface IRuler {
  showUp: boolean;
  color?: string;
  startPos: number[];
  slug?: string;
  rulerLength?: number;
  // onClick: () => void;
}

const Ruler: React.FC<IRuler> = ({
  showUp,
  color,
  startPos,
  slug,
  rulerLength,
  // onClick
}) => {
  return (
    <>
      {/* Define striped pattern Ruler with dynamic color */}
      <defs>
        <pattern id={`svg-stripes-pattern-11424-${slug}-a`} patternTransform="rotate(-45)" width="90%" height="8" x="0" y="0" patternUnits="userSpaceOnUse">
          <animate attributeName="y" begin="0s" dur="1000s" from="5000px" to="0px" repeatCount="indefinite" fill="freeze"></animate>
          <g>
            <rect x="0" y="0" width="100%" height="4" fill={color} className="opacity-[.18]"></rect>
          </g>
        </pattern>
        <pattern id={`svg-stripes-pattern-11424-${slug}-b`} patternTransform="rotate(45)" width="90%" height="8" x="0" y="0" patternUnits="userSpaceOnUse">
          <animate attributeName="y" begin="0s" dur="1000s" from="5000px" to="0px" repeatCount="indefinite" fill="freeze"></animate>
          <g>
            <rect x="0" y="0" width="100%" height="4" fill={color} className="opacity-[.18]"></rect>
          </g>
        </pattern>
      </defs>
      {/* Draw Ruler */}
      <g
        // id={`${slug}`}
        // onClick={() => onClick(slug)}
        className={`${showUp ? 'visible opacity-100' : 'invisible opacity-0'} hidden md:block transition-all duration-300 cursor-pointer`}
      >
        {/* Arrows' half part above */}
        <rect
          x={startPos[0]}
          y={startPos[1] + 1}
          width={rulerLength}
          height="7"
          fill={`url(#svg-stripes-pattern-11424-${slug}-a)`}
        ></rect>
        {/* Arrows' half part below */}
        <rect
          x={startPos[0]}
          y={startPos[1] - 6}
          width={rulerLength}
          height="7"
          fill={`url(#svg-stripes-pattern-11424-${slug}-b)`}
        ></rect>
      </g>
    </>
  );
};

export default Ruler;