import React, { useState, useEffect } from 'react';
import Branch from './Branch';
import Timeline from './Timeline';
import Point from './Point';
import Button from './Button';
import Popup from './Popup';
import { Year, Text } from './Text';
import raw_data from '../cv_gj2.json';
import raw_data_test from '../cv_test.json';
import raw_categories from '../categories.json';
import themes from '../themes.json';
import { ITree, IGeneral, IItem, IPoint, IContent, ITimeline } from '../interfaces/Tree';

interface ICvTree {
  bgColor: string;
  textColor: string;
}

type IFilter = 'all' | 'school' | 'uni' | 'job' | 'music' | 'it' | 'private';

interface ICategories {
  buttonLabel: string;
  value: string;
}

const CvTree: React.FC<ICvTree> = ({
  bgColor,
  textColor
}) => {

  const data = raw_data as ITree;
  const categories = raw_categories as ICategories[];

  const theme = themes[2];

  const general: IGeneral = data.general;
  const point: IPoint = data.point;
  const timeline: ITimeline = data.timeline;
  const items: IItem[] = data.items;

  const step: number = general.step;
  const size: number = general.size;
  const pointSize: number = point.pointSize;
  const pointStrokeWidth: number = point.pointStrokeWidth;
  const [strokeWidth, setStrokeWidth] = useState<number>(general.strokeWidth);

  // Timeline
  const [timelineHeight, setTimelineHeight] = useState<number>(step * items.length + 120);
  const [horisontalPosition, setHorisontalPosition] = useState<number>(general.horisontalPosition);

  // Svg
  const [svgHeight, setSvgHeight] = useState<number>(timelineHeight);
  const [svgWidth, setSvgWidth] = useState<number>(general.width);

  const timelineStartPos = svgWidth / 2;

  useEffect(() => {
    setTimelineHeight(step * items.length);
  }, []);

  // Sort items to be in the descending order
  const [sortedItems, setSortedItems] = useState<IItem[]>(items.sort((a, b) => a.content.year - b.content.year));

  // Data modification loop:
  // - add end year if not there
  // - remove year duplicates
  items.forEach((_, i, a) => {
    // Because items are in the descending order, we need to turn index also around:
    const descIndex: number = a.length - 1 - i
    const item: IItem = items[descIndex];
    const content: IContent = item.content;

    const endIndex: number = sortedItems.findIndex(obj => obj.content.year === content.end);

    if (content.end && endIndex === -1) {

      // If the year of the finishing of a project is not a starting point of another (so it would not be shown), it will be added without any additional text.
      items.push({
        content: {
          slug: `generated_slug_${i}`,
          typeOfActivity: '',
          categories: '',
          institute: '',
          name: '',
          year: content.end,
          showYear: true
        },
      });
    }

    // Remove year duplicates (because of the rendering direction, the last one must be kept)
    // First save all indexes of matches
    let duplicateIndexes: number[] = [];

    items.forEach((item, i) =>
      item.content.year === content.year && duplicateIndexes.push(i)
    );

    // There will be at least one match (itself) so if there is more, set showYear fo false
    if (duplicateIndexes.length > 1) {
      duplicateIndexes.forEach((nr, i) => {
        if (i) { items[nr].content.showYear = false; }
      });
    }
  });

  const [filter, setFilter] = useState<IFilter>('all');

  const getColor = (item: IItem, filter: IFilter) => {
    const category: string | string[] = item.content.categories

    if (filter !== 'all') {
      if (Array.isArray(category)) {
        if (!category.includes(filter)) {
          return '#ccc';
        }
      } else {
        if (category !== filter) {
          return '#ccc';
        }
      }
    }


    let color = '';

    if (item.layout?.side === 'left') {
      // color of the left side
      color = theme.left[item.layout?.startingLevel];

    } else if (item.layout?.side === 'right') {
      // color of the right side
      color = theme.right[item.layout?.startingLevel];

    } else {
      // Point colors on the timeline
      color = theme.timeline;

    }

    return color;
  };

  const [selectedButton, setSelectedButton] = useState<IFilter>('all');

  useEffect(() => {
    setFilter(selectedButton);
  }, [selectedButton]);

  const handleButtonClick = (value: IFilter) => {
    setSelectedButton(value);
  };

  const [showPopup, setShowPopup] = useState<string | undefined>();

  const handleOnClickPopup = (e: React.MouseEvent<SVGTextElement, MouseEvent>) => {
    setShowPopup(e.currentTarget.id);
  };

  return (
    <>
      <div className="overflow-hidden">
        {/* Buttons */}
        <div
          className="btn-categories flex flex-wrap sm:w-[500px] mt-24 mx-auto"
          style={{
            position: "-webkit-sticky",
            top: 0,
          }}
        >
          {categories.map((category, i) => (
            <React.Fragment key={`button_${i}`}>
              <Button
                key={category.value}
                label={category.buttonLabel}
                isActive={selectedButton === category.value}
                onClick={() => handleButtonClick(category.value as IFilter)}
              />
            </React.Fragment>
          ))}
        </div>
        <div className={`relative mx-auto w-[390px] md:-translate-x-[100px]`} >
          <div className="mx-auto w-[100%]">
          </div>
          <svg
            height={svgHeight}
            width={svgWidth}
            className={`
            w-[100vw]
            relative
            box-content
          `}
          >
            <g transform="translate(0, 23)">


              {/* Loop of items */}
              {items.map((_, i, a) => {
                const index = a.length - 1 - i;
                const item = items[index];
                const content = item.content;
                const layout = item.layout;
                const side: string = layout ? layout.side : 'left';
                const yPos = step * (i + 1) + 6;
                const end = layout?.end;
                const color = getColor(item, filter)

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
                  <React.Fragment key={`branch_${i}`}>

                    {/* Branch */}
                    {layout &&
                      <Branch
                        height={startEndDiff - 0.5}
                        step={step}
                        size={size}
                        side={side}
                        color={color}
                        bgColor={general.bgColor}
                        strokeWidth={strokeWidth}
                        pos={[horisontalPosition, step * (i + 1) + step * .58]}
                        heightTillTop={heightTillTop}
                        level={layout?.startingLevel}
                        levelDistanceReduction={general.levelDistanceReduction}
                        open={layout.open}
                        openBranchIndexes={openBranchIndexes ? openBranchIndexes : undefined}
                        newBranchOn={layout.newBranchOn}
                        pointStrokeWidth={pointStrokeWidth}
                        pointSize={pointSize}
                        end={end}
                        canceled={layout.canceled}
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
                      textColor={color}
                      y={yPos}
                      horisontalPosition={horisontalPosition}
                      categoryColor={color}
                      onClick={handleOnClickPopup}
                      showPopup={{ showPopup, setShowPopup }}
                    />

                  </React.Fragment>
                );
              })}

              {/* Timeline */}
              <Timeline
                height={timelineHeight}
                color={timeline.color}
                strokeWidth={strokeWidth}
                startPos={timelineStartPos}
                isTimeline={true}
                horisontalPosition={horisontalPosition}
              />

              {/* Point at the very end  */}
              <Point
                pos={[horisontalPosition, 0]}
                pointSize={pointSize}
                strokeWidth={pointStrokeWidth}
                color={timeline.color}
                bgColor={bgColor}
                isMajor={true}
                levelDistanceReduction={general.levelDistanceReduction}
                branchWidth={general.size}
              />

              {/* Points */}
              {items.map((item, i, a) => {
                const index = a.length - 1 - i;
                const color = getColor(item, filter)
                return (
                  <>
                    <React.Fragment key={`point_${i}`}>
                      <Point
                        pos={[general.horisontalPosition, step * (index + 1)]}
                        pointSize={pointSize}
                        strokeWidth={pointStrokeWidth}
                        color={color}
                        bgColor={bgColor}
                        isMajor={item.content.isMajor}
                        side={item.layout?.side}
                        level={item.layout?.level}
                        levelDistanceReduction={general.levelDistanceReduction}
                        branchWidth={general.size}
                      />
                    </React.Fragment>
                    <React.Fragment key={`popup_${i}`}>
                      <Popup
                        color={color}
                        content={item.content}
                        verticalPosition={step * (index + 1) + 6}
                        horisontalPosition={horisontalPosition}
                        showPopup={showPopup}
                        setShowPopup={setShowPopup}
                      />
                    </React.Fragment>
                  </>
                );
              })}
            </g>
          </svg>
        </div>
      </div>
    </>
  );
};

export default CvTree;