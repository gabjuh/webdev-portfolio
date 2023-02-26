import React, { useState } from 'react';
import Branch from './Branch';
import Tube from './Tube';
import Point from './Point';

interface ICvTree {
  bgColor: string;
}

const CvTree: React.FC<ICvTree> = ({
  bgColor
}) => {

  const [factor, setFactor] = useState<number>(2); // factor for sizing
  const sizeUnit: number = 15; // smallest unit to calc the size
  const size: number = factor * sizeUnit; // size is the sizeUnit multiplied by the factor
  const level: number = 2 * size; // level is actually the bright of the level of the branches
  const [jumpToLevel, setJumpToLevel] = useState<number>(2); // the number of how many braches will be jumped through
  const [strokeWidth, setStrokeWidth] = useState<number>(8); // simply the width of the Bend
  const [direction, setDirection] = useState<'right' | 'left'>('left'); // direction of the bend
  const height: number = level; // height is 2 times the level (hight), always the same.

  const [color, setColor] = useState<string>('lightgreen'); // color of the Bend

  const width: number = (level + strokeWidth) + jumpToLevel * size; // width is 2 times the level plus the strokeWidth, and if jumpToLevel !== 0, it will be multiplicated by the size
  const startPos: number = direction === 'right' ? strokeWidth : width; // set the starting position, default it is 0 + strokeWidht, or if direction is left, it is the width

  // The first line of code turns to the branch 90deg to the right, the third one 90deg to the left. The code in the middle makes it longer between, if jumpToLevel > 0
  const bendRight: string = `
    q 0 -${size} ${size} -${size}
    ${jumpToLevel ? `l ${size * jumpToLevel} 0` : ''}
    q ${size} 0 ${size} -${size}
  `;

  // Same as above, but with different signs and direction
  const bendLeft: string = `
    q 0 -${size} -${size} -${size}
    ${jumpToLevel ? `l -${size * jumpToLevel} 0` : ''}
    q -${size} 0 -${size} -${size}
  `;

  // Stock
  const [stockHeight, setStockHeight] = useState<number>(250);

  // Svg
  const [svgHeight, setSvgHeight] = useState<number>(stockHeight + 150);
  const [svgWidth, setSvgWidth] = useState<number>(400);


  return (
    <>
      {/* <svg className="border h-[300px]" style={{ position: "relative" }} >
        <path d="M 100 100 L 50 50 0 -50" fill="none" strokeWidth="5" stroke="red" style={{ position: "absolute", bottom: 10 }} />
      </svg> */}

      <svg
        height={svgHeight}
        // width={strokeWidth}
        width={svgWidth}
        className={`
          mx-auto border
          py-10
          relative
        `}
      >

        {/* Stock */}
        <g transform="translate(0, 20)">
          <Tube
            height={stockHeight}
            branchWidth={width}
            // color={color}
            color={'orange'}
            strokeWidth={strokeWidth}
            direction={direction}
            startPos={svgWidth / 2}
            isStock={true}
          />
          <Point
            color={'orange'}
            isMajor={true}
            bgColor={bgColor}
            pos={[200, 11]}
          />
          <Point
            color={'orange'}
            isMajor={true}
            bgColor={bgColor}
            pos={[200, stockHeight]}
          />
        </g>


        {/* 
        <Branch
          height={height}
          width={width}
          color={color}
          strokeWidth={strokeWidth}
          level={level}
          startPos={startPos}
          direction={'left'}
          bend={[bendRight, bendLeft]}
          bgColor={bgColor}
        /> */}



      </svg>
    </>
  );
};

export default CvTree;