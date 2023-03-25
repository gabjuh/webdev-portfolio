import React from 'react';

interface IRuler {
  showUp: boolean;
  color?: string;
  startPos: number[];
}

const Ruler: React.FC<IRuler> = ({
  showUp,
  color,
  startPos,
}) => {
  return (
    <>
      <defs>
        <pattern id="svg-stripes-pattern-11424" patternTransform="rotate(-45)" width="90%" height="8" x="0" y="0" patternUnits="userSpaceOnUse">
          <animate attributeName="y" begin="0s" dur="1000s" from="5000px" to="0px" repeatCount="indefinite" fill="freeze"></animate>
          <g>
            <rect x="0" y="0" width="100%" height="4" fill={color} className="opacity-[.18]"></rect>
          </g>
        </pattern>
        <pattern id="svg-stripes-pattern-11425" patternTransform="rotate(45)" width="90%" height="8" x="0" y="0" patternUnits="userSpaceOnUse">
          <animate attributeName="y" begin="0s" dur="1000s" from="5000px" to="0px" repeatCount="indefinite" fill="freeze"></animate>
          <g>
            <rect x="0" y="0" width="100%" height="4" fill={color} className="opacity-[.18]"></rect>
          </g>
        </pattern>
      </defs>
      <g className={`${showUp ? 'visible' : 'invisible'} transition-all duration-300`}>
        <rect
          x={startPos[0]}
          y={startPos[1] + 1}
          width="700"
          height="7"
          fill="url(#svg-stripes-pattern-11424)"
        ></rect>
        <rect
          x={startPos[0]}
          y={startPos[1] - 6}
          width="700"
          height="7"
          fill="url(#svg-stripes-pattern-11425)"
        ></rect>
      </g>
    </>
  );
};

export default Ruler;