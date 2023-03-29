import React, { useState, useEffect } from 'react';

//  Components
import Branch from './Branch';
import Timeline from './Timeline';
import Point from './Point';
import Button from './Button';
import Popup from './Popup';
import { Year, Text } from './Text';

//  Assets
import downArrow from '../assets/logos/down-arrow.svg';

//  Data
import raw_data from '../cv_gj2.json';
import raw_categories from '../categories.json';
import themes from '../themes.json';

//  Interfaces
import { ITree, IGeneral, IItem, IPoint, IContent, ITimeline } from '../interfaces/Tree';

//  Helpers
import { scrollToId } from '../helpers/pageNavigation';

type IFilter = 'all' | 'education' | 'job' | 'music' | 'it' | 'private';

interface ICategories {
  buttonLabel: string;
  value: string;
}

const CvTree: React.FC = ({ }) => {

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
  const [svgHeight, setSvgHeight] = useState<number>(timelineHeight + 200);
  const [svgWidth, setSvgWidth] = useState<number>(general.width);

  const timelineStartPos = svgWidth / 2;

  useEffect(() => {
    setTimelineHeight(step * items.length);
  }, []);

  // Sort items to be in the descending order
  const [sortedItems, setSortedItems] = useState<IItem[]>(items.sort((a, b) => a.content.year - b.content.year));

  const [sortedPopupItems, setSortedPopupItems] = useState<IItem[]>(sortedItems.filter(item => item.content.name.length !== 0 && item.content.categories !== 'private'));

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
  const [selectedPopupIndex, setSelectedPopupIndex] = useState<number>(sortedPopupItems.length - 1);
  const [selectedPopupSlug, setSelectedPopupSlug] = useState<string>(sortedPopupItems[selectedPopupIndex].content.slug);

  const handleOnClickPopup = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowPopup(e.currentTarget.id);
    const element = document.getElementById(e.currentTarget.id);
    const yOffSet = 220;
    if (element) {
      const rect = element.getBoundingClientRect();
      const y = rect.top + window.pageYOffset - yOffSet;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setSelectedPopupSlug(selectedPopupSlug === e.currentTarget.id ? '' : e.currentTarget.id);
    console.log('asd');
  };

  useEffect(() => {
    setShowPopup(selectedPopupSlug);
  }, []);

  const handleDownArrowKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown') {
      setSelectedPopupIndex(selectedPopupIndex - 1);
      setSelectedPopupSlug(sortedPopupItems[selectedPopupIndex - 1].content.slug);

      console.log('down arrow');
    }
  };

  // useEffect(() => {
  //   window.addEventListener('keydown', handleDownArrowKeyDown);
  //   return () => {
  //     window.removeEventListener('keydown', handleDownArrowKeyDown);
  //   };
  // }, []);

  useEffect(() => {
    setShowPopup(selectedPopupSlug);
  }, [selectedPopupSlug]);

  const [isMenuSticky, setIsMenuSticky] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const buttons = document.querySelector('#buttons');
      const yOffSet = buttons ? buttons.getBoundingClientRect().top : 0;
      setIsMenuSticky(yOffSet <= 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);

  return (
    <>
      <div className="relative" id="cv"
      >
        {/* Buttons */}
        <div 
          className="absolute right-0 left-0"
          style={{ height: `${svgHeight - 150}px` }}
        >
          <div
            className={`btn-categories flex flex-wrap sm:w-[100%] mx-auto z-10 p-8 backdrop-filter backdrop-blur-md justify-center ${isMenuSticky && 'shadow-lg'} transition-all duration-200`}
            style={{
              position: "sticky",
              top: 0,
            }}
            id="buttons"
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
          <button
              onMouseUp={() => { scrollToId('home'); }}
            className="cursor-pointer"
          >
            <img src={downArrow} alt="Arrow"
              className="rotate-180 ml-5 w-[.85rem] hover:-translate-y-[.3rem] transition-all duration-150"
            />
          </button>
        </div>
        </div>
        <div className={`relative mx-auto xl:w-[920px] lg:w-[820px] md:w-[470px] w-[390px] pt-[100px] md:-translate-x-[100px] z-0`} >
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
                  <React.Fragment key={`branch_${index}`}>

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
                      textColor={general.textColor}
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
                bgColor={theme.timeline}
                isMajor={true}
                levelDistanceReduction={general.levelDistanceReduction}
                branchWidth={general.size}
              />

              {/* Points */}
              {items.map((item, i, a) => {
                const index = a.length - 1 - i;
                const color = getColor(item, filter)
                return (
                  <React.Fragment key={`point_${index}`}>
                      <Point
                        pos={[general.horisontalPosition, step * (index + 1)]}
                        pointSize={pointSize}
                        strokeWidth={pointStrokeWidth}
                        color={color}
                      bgColor={general.bgColor}
                        isMajor={item.content.isMajor}
                        side={item.layout?.side}
                        level={item.layout?.level}
                        levelDistanceReduction={general.levelDistanceReduction}
                        branchWidth={general.size}
                      slug={item.content.slug}
                      selectedPopupSlug={selectedPopupSlug}
                    />
                      <Popup
                        color={color}
                        content={item.content}
                        verticalPosition={step * (index + 1) + 6}
                        horisontalPosition={horisontalPosition}
                        showPopup={showPopup}
                        setShowPopup={setShowPopup}
                        layout={item.layout}
                      selectedPopupSlug={selectedPopupSlug}
                      handleOnClickPopup={handleOnClickPopup}
                      />
                  </React.Fragment>
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