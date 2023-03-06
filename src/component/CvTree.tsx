import React, { useState, useEffect } from 'react';
import Branch from './Branch';
import Timeline from './Timeline';
import Point from './Point';
import { Year, Text } from './Text';
import * as data from '../cv_gj2.json';
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
  const [strokeWidth, setStrokeWidth] = useState<number>(general.strokeWidth); // simply the width of the Bend

  const step = general.step;

  // Timeline
  const [timelineHeight, setTimelineHeight] = useState<number>(step * data.items.length + 120);
  const [horisontalPosition, setHorisontalPosition] = useState<number>(general.horisontalPosition);

  // Svg
  const [svgHeight, setSvgHeight] = useState<number>(timelineHeight);
  const [svgWidth, setSvgWidth] = useState<number>(general.width);

  const timelineStartPos = svgWidth / 2;

  useEffect(() => {
    setTimelineHeight(step * data.items.length);
  }, []);

  // Sort items
  const [sortedItems, setSortedItems] = useState(data.items.sort((a, b) => a.content.year - b.content.year));

  // Opened branches
  const [openedBranches, setOpenedBranches] = useState();



  // Data modification loop:
  // - add end year if not there
  // - remove duplicates
  data.items.forEach((_, i, a) => {
    const item = data.items[a.length - 1 - i];
    const content = item.content;

    const endIndex = sortedItems.findIndex(obj => obj.content.year === content.end);

    if (content.end && endIndex === -1) {

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
              const item = data.items[index];
              const content = item.content;
              const layout = item.layout;
              const side: string = layout ? layout.side : 'left';
              const yPos = step * (i + 1) + 6;

              // LOGIC TO GET THE PROPER HEIGHT OF AN UNFINISHED BRANCH
              // Find the year object index, where the end year is
              const endYearIndex = sortedItems.findIndex(obj => content.end && content.end === obj.content.year);

              // Get the difference - not in years but in index-numbers!
              const startEndDiff = endYearIndex && endYearIndex > -1 ? index - endYearIndex : 1;

              // Get index, if item has no end point but still has a branch.
              const indexIfNotEndedYet = layout && !content.end && content.name ? index : null;

              // Extract not ended index from the length of sortedItems
              const heightTillTop: number | null = indexIfNotEndedYet && indexIfNotEndedYet > 0 ? sortedItems.length - indexIfNotEndedYet - 1 : null;

              // LOGIC TO GET THE DISTANCE OF AN OPEN ENDED AND OPEN STARTED BRANCH
              let openBranchIndexes: number[] | undefined = undefined;

              if (item.content.end && item.layout?.open === 'end') {
                const arr = [];
                const indexOpenEnded = sortedItems.findIndex(el => el === item);
                arr.push(indexOpenEnded);

                const match = sortedItems.filter(el =>
                  item.layout?.side === el.layout?.side &&
                  item.layout?.level === el.layout?.level &&
                  el.layout?.open === 'start'
                );

                const indexOpenStarted = sortedItems.findIndex(el => el === match[0]);

                indexOpenStarted && arr.push(indexOpenStarted);

                openBranchIndexes = arr;
              }


              return (
                <React.Fragment key={i}>

                  {/* Branch */}
                  {layout && //&& !content.hidden === undefined
                    <Branch
                      height={startEndDiff}
                      step={step}
                      size={size}
                      side={side}
                      color={side && side === 'left' ? themes[0].left[layout?.level] : side && themes[0].right[layout?.level]}
                      strokeWidth={strokeWidth}
                      pos={[horisontalPosition, step * (i + 1)]}
                      level={layout?.level}
                      heightTillTop={heightTillTop}
                      levelDistanceReduction={general.levelDistanceReduction}
                      open={layout.open}
                      openBranchIndexes={openBranchIndexes ? openBranchIndexes : undefined}
                    />
                  }

                  {/* Year */}
                  <Year
                    content={content}
                    textColor={textColor}
                    y={yPos}
                    i={index}
                  />

                  {/* Name */}
                  <Text
                    content={content}
                    textColor={textColor}
                    y={yPos}
                    verticalPosition={horisontalPosition}
                  />

                </React.Fragment>
              );
            })}

            {/* Timeline */}
            <Timeline
              height={timelineHeight}
              color={data.timeline.color}
              strokeWidth={strokeWidth}
              startPos={timelineStartPos}
              isTimeline={true}
              verticalPosition={horisontalPosition}
            />

            {/* Point at the very end  */}
            <Point
              color={data.timeline.color}
              isMajor={true}
              bgColor={bgColor}
              pos={[horisontalPosition, 0]}
              size={pointSize}
              strokeWidth={pointStrokeWidth}
            />

            {/* Points */}
            {[...Array(data.items.length)].map((_, i, a) => {
              return (
                <React.Fragment key={i}>
                  <Point
                    color={data.timeline.color}
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