import React, { useState, useEffect } from 'react';
import Branch from './Branch';
import Tube from './Tube';
import Point from './Point';
import Item from './Item';
import * as data from '../cv.json';

// type DataKeysGeneral = keyof typeof data.general;
// const dataKeysGeneral: DataKeysGeneral[] = Object.keys(data) as DataKeysGeneral[];

interface ICvTree {
  bgColor: string;
  textColor: string;
}

const CvTree: React.FC<ICvTree> = ({
  bgColor,
  textColor
}) => {

  const general = (data.general);

  const [factor, setFactor] = useState<number>(general.factor); // factor for sizing
  const sizeUnit: number = general.sizeUnit; // smallest unit to calc the size
  const size: number = factor * sizeUnit; // size is the sizeUnit multiplied by the factor
  const pointSize: number = 6;
  const pointStrokeWidth: number = 1.5;
  const level: number = 2 * size; // level is actually the bright of the level of the branches
  const [jumpToLevel, setJumpToLevel] = useState<number>(0); // the number of how many braches will be jumped through
  const [strokeWidth, setStrokeWidth] = useState<number>(5); // simply the width of the Bend
  const [direction, setDirection] = useState<'right' | 'left'>('right'); // direction of the bend
  const height: number = level; // height is 2 times the size (hight), always the same.

  const [color, setColor] = useState<string>('lightgreen'); // color of the Bend

  const width: number = (level + strokeWidth) + jumpToLevel * size; // width is 2 times the level plus the strokeWidth, and if jumpToLevel !== 0, it will be multiplicated by the size
  const startPos: number = direction === 'right' ? strokeWidth : width; // set the starting position, default it is 0 + strokeWidht, or if direction is left, it is the width

  const step = 60;

  // Stock
  const [stockHeight, setStockHeight] = useState<number>(step * data.items.length);

  // Svg
  const [svgHeight, setSvgHeight] = useState<number>(stockHeight + 50);
  const [svgWidth, setSvgWidth] = useState<number>(400);

  const stockStartPos = svgWidth / 2;

  useEffect(() => {
    setStockHeight(step * data.items.length);
  }, []);

  // Sort items
  data.items.sort((a, b) => a.content.year - b.content.year);

  return (
    <>
      <div
        className={`relative border mx-auto`}
        style={{
          width: `${svgWidth}px`
        }}
      >
        <svg
          height={svgHeight}
          // width={strokeWidth}
          width={svgWidth}
          className={`
          mx-auto border
          relative
          box-content
        `}
        >
          <g transform="translate(0, 23)">


            {/* Loop of items */}
            {[...Array(data.items.length)].map((_, i, a) => {
              const item = data.items[a.length - 1 - i];
              const content = item.content;
              const layout = item.layout;
              const side = layout?.side;

              return (
                <React.Fragment key={i}>

                  {/* SIDEBRANCH */}
                  {/* Branch */}
                  {layout &&
                    <Branch
                      id={`branch_${i}`}
                      height={height}
                      width={width}
                      size={size}
                      side={side}
                      color={layout ? layout.color : 'red'}
                      strokeWidth={strokeWidth}
                      level={level}
                      pos={[200, step * (i + 1) + step / 2.1]}
                      startPos={stockStartPos + strokeWidth / 2}
                      direction={direction}
                      bgColor={bgColor}
                      pointSize={pointSize}
                      pointStrokeWidth={pointStrokeWidth}
                      jumpToLevel={jumpToLevel}
                    />
                  }

                  {/* TEXTS */}
                  {/* Year */}
                  <text x="20" y={step * (i + 1) + 6} fill={textColor}>{content.year}</text>

                  {/* Name */}
                  <text x="250" y={step * (i + 1) + 6} fill={textColor}>{content.name}</text>
                </React.Fragment>
              );
            })}

            {/* STACKLINE */}
            {/* Stack */}
            <Tube
              height={stockHeight}
              branchWidth={width}
              color={'orange'}
              strokeWidth={strokeWidth}
              direction={direction}
              startPos={stockStartPos}
              isStock={true}
            />

            {/* Point at the very end  */}
            <Point
              color={'orange'}
              isMajor={true}
              bgColor={bgColor}
              pos={[200, 0]}
              size={pointSize}
              strokeWidth={pointStrokeWidth}
            />

            {/* Points */}
            {[...Array(data.items.length)].map((_, i, a) => {
              return (
                <React.Fragment key={i}>
                  <Point
                    id={`point_${i}`}
                    color={'orange'}
                    isMajor={true}
                    bgColor={bgColor}
                    pos={[200, step * (i + 1)]}
                    size={pointSize}
                    strokeWidth={pointStrokeWidth}
                  />
                </React.Fragment>
              );
            })}

          </g>
        </svg>
      </div>
    </>
  );
};

export default CvTree;;