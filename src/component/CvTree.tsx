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
}

const CvTree: React.FC<ICvTree> = ({
  bgColor
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

  const step = 50;

  // Stock
  const [stockHeight, setStockHeight] = useState<number>(step * data.rightSide.length);

  // Svg
  const [svgHeight, setSvgHeight] = useState<number>(stockHeight + 50);
  const [svgWidth, setSvgWidth] = useState<number>(400);

  const stockStartPos = svgWidth / 2;

  useEffect(() => {
    setStockHeight(step * data.rightSide.length);
  }, []);

  return (
    <>
      <div
        className={`relative border mx-auto`}
        style={{
          width: `${svgWidth}px`
        }}
      >
        {/* <Item>
          <Branch
            height={height}
            width={width}
            size={size}
            color={color}
            strokeWidth={strokeWidth}
            level={level}
            startPos={stockStartPos + strokeWidth / 2}
            direction={direction}
            bgColor={bgColor}
            pointSize={pointSize}
            pointStrokeWidth={pointStrokeWidth}
            jumpToLevel={jumpToLevel}
          />
          <p>asd</p>
        </Item> */}

        {/* Stock */}
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
          <g transform="translate(0, 20)">
            <Tube
              height={stockHeight}
              branchWidth={width}
              // color={color}
              color={'orange'}
              strokeWidth={strokeWidth}
              direction={direction}
              startPos={stockStartPos}
              isStock={true}
            />
            <Point
              color={'orange'}
              isMajor={true}
              bgColor={bgColor}
              pos={[200, 0]}
              size={pointSize}
              strokeWidth={pointStrokeWidth}
            />
            {[...Array(data.rightSide.length)].map((_, i, a) => {
              return (
                <React.Fragment key={i}>
                  <Point
                    color={'orange'}
                    isMajor={true}
                    bgColor={bgColor}
                    pos={[200, step * (i + 1)]}
                    size={pointSize}
                    strokeWidth={pointStrokeWidth}
                  />
                  <text x="20" y={step * (i + 1) + 6} fill="#eee">{data.rightSide[a.length - 1 - i].content.year}</text>
                  <text x="250" y={step * (i + 1) + 6} fill="#eee">{data.rightSide[a.length - 1 - i].content.name}</text>
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