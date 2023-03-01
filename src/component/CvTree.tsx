import React, { useState, useEffect } from 'react';
import Branch from './Branch';
import Tube from './Tube';
import Point from './Point';
import { Year, Text } from './Text';
import * as data from '../cv_gj.json';
import themes from '../themes.json';

interface ICvTree {
  bgColor: string;
  textColor: string;
}

const CvTree: React.FC<ICvTree> = ({
  bgColor,
  textColor
}) => {

  const general = (data.general);

  const size: number = general.size; // size is the sizeUnit multiplied by the factor
  const pointSize: number = 6;
  const pointStrokeWidth: number = 1.5;
  const level: number = 2 * size; // level is actually the bright of the level of the branches
  // const [jumpToLevel, setJumpToLevel] = useState<number>(0); // the number of how many braches will be jumped through
  const [strokeWidth, setStrokeWidth] = useState<number>(general.strokeWidth); // simply the width of the Bend
  // const height: number = level; // height is 2 times the size (hight), always the same.


  const step = 60;

  // Timeline
  const [stockHeight, setStockHeight] = useState<number>(step * data.items.length);

  // Svg
  const [svgHeight, setSvgHeight] = useState<number>(stockHeight + 50);
  const [svgWidth, setSvgWidth] = useState<number>(400);

  const stockStartPos = svgWidth / 2;

  useEffect(() => {
    setStockHeight(step * data.items.length);
  }, []);

  // Sort items
  const [sortedItems, setSortedItems] = useState(data.items.sort((a, b) => a.content.year - b.content.year));

  // console.log('sorted', sortedItems);
  // console.log('original', data.items);

  // Data modification loop:
  // - add end year if not there
  // - remove duplicates
  data.items.forEach((_, i, a) => {
    const item = data.items[a.length - 1 - i];
    const content = item.content;

    // const startIndex = sortedItems.findIndex(obj => obj.content.year === content.year);
    const endIndex = sortedItems.findIndex(obj => obj.content.year === content.end);

    // If end year is not defined or ..
    if (content.end === undefined) {
      // console.log('still active');
    } else if (endIndex === -1) {
      // console.log('should be closed', content.end);

      // If the year of the finishing of a project is not a starting point of another (so it would not be shown), it will be added without any additional text.
      data.items.push({
        content: {
          slug: `generated_slug_${i}`,
          name: '',
          year: content.end,
          showYear: true
        },
      });
    }

    // Remove year duplicates (because of the rendering direction, the last one must be kept)
    // First save all indexes of matches
    let duplicateIndexes: number[] = [];
    data.items.forEach((item, i) =>
      item.content.year === content.year && duplicateIndexes.push(i)
    );

    // There will be at least one match (itself) so if there is more, set showYear fo false
    if (duplicateIndexes.length > 1) {
      duplicateIndexes.forEach((nr, i) => {
        if (i) { data.items[nr].content.showYear = false; }
      });
    }
  });

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
            {data.items.map((_, i, a) => {
              const index = a.length - 1 - i;
              // const index = i;
              const item = data.items[index];
              const content = item.content;
              const layout = item.layout;
              const side: string = layout ? layout.side : 'left';
              const yPos = step * (i + 1) + 6;

              // Find the year object index, where the end year is
              const endYearIndex = sortedItems.findIndex(obj => content.end && content.end === obj.content.year);

              // Get the differenz - not in years but in index-numbers!
              // const startEndDiff = index !== endYearIndex && endYearIndex > -1 ? index - endYearIndex : null;
              const startEndDiff = endYearIndex && endYearIndex > -1 ? index - endYearIndex : 1;

              return (
                <React.Fragment key={i}>

                  {/* Branch */}
                  {layout &&
                    <Branch
                      height={startEndDiff}
                      step={step}
                      size={size}
                      side={side}
                      // color={themes[0].right[layout?.jumpToLevel]}
                      color={side && side === 'left' ? themes[0].left[layout?.jumpToLevel] : side && themes[0].right[layout?.jumpToLevel]}
                      strokeWidth={strokeWidth}
                      pos={[200, step * (i + 1)]}
                      jumpToLevel={layout?.jumpToLevel}
                    />
                  }

                  {/* Year */}
                  <Year
                    content={content}
                    textColor={textColor}
                    y={yPos}
                  />

                  {/* Name */}
                  <Text
                    content={content}
                    textColor={textColor}
                    y={yPos}
                  />

                </React.Fragment>
              );
            })}

            {/* Stack */}
            <Tube
              height={stockHeight}
              color={'orange'}
              strokeWidth={strokeWidth}
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