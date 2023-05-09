import React, { useState, useEffect } from 'react';

//  Components
import Branch from './Branch';
import Timeline from './Timeline';
import Point from './Point';
import Button from './Button';
import Popup from './Popup';
import { Year, Text } from './Text';
import Title from './Title';

//  Assets
import downArrow from '../assets/logos/down-arrow.svg';

//  Data
import raw_data from '../data/cv/cv_gj2.json';
import raw_categories from '../data/cv/categories.json';
import themes from '../themes.json';
import { horisontalPositions, breakpoints } from '../data/positions/horisontalPositions';
import images from '../data/tree/images';

//  Interfaces
import { ITree, IGeneral, IItem, IPoint, IContent, ITimeline } from '../interfaces/Tree';
import ICategories from '../interfaces/Categories';

//  Helpers
import { scrollToId } from '../helpers/pageNavigation';
import { getViewWidth } from '../helpers/getViewWidth';
import { getPosition } from '../helpers/getPosition';

type IFilter = 'all' | 'education' | 'job' | 'music' | 'it' | 'private';

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

  const [viewWidth, setViewWidth] = useState<number>(getViewWidth());

  // Get timeline position
  const getTimelinePosition = (): number => getPosition('timelinePos', viewWidth);

  // Timeline
  const [timelineHeight, setTimelineHeight] = useState<number>(step * items.length + 120);
  const [timelineHorisontalPosition, setTimelineHorisontalPosition] = useState<number>(getTimelinePosition());

  // Get the horizontal position of the popup, title and text
  const getPopupHorizontalPosition = (): number => getPosition('popupPos', viewWidth) + timelineHorisontalPosition;
  const getTitleHorizontalPosition = (): number => getPosition('titlePos', viewWidth) + timelineHorisontalPosition;
  const getTextHorizontalPosition = (): number => getPosition('textPos', viewWidth) + timelineHorisontalPosition;
  const getYearHorizontalPosition = (): number => getPosition('yearPos', viewWidth) + timelineHorisontalPosition;

  // Svg
  const [svgHeight, setSvgHeight] = useState<number>(timelineHeight + 220);
  const [svgWidth, setSvgWidth] = useState<number>(general.width);

  const timelineStartPos = svgWidth / 2;

  useEffect(() => {
    setTimelineHeight(step * items.length);
  }, []);

  // Sort items to be in the descending order
  const [sortedItems, setSortedItems] = useState<IItem[]>(items.sort((a, b) => a.content.year - b.content.year));

  // const [sortedPopupItems, setSortedPopupItems] = useState<IItem[]>(sortedItems.filter(item => item.content.name.length !== 0 && item.content.categories !== 'private'));
  const [sortedPopupItems, setSortedPopupItems] = useState<IItem[]>(sortedItems.filter(item => item.content.name.length !== 0));

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
  const [selectedPopupIndex, setSelectedPopupIndex] = useState<number>(sortedPopupItems.length - 2);
  const [selectedPopupSlug, setSelectedPopupSlug] = useState<string>(sortedPopupItems[selectedPopupIndex].content.slug);
  const [changePopupDirection, setChangePopupDirection] = useState<'next' | 'prev' | undefined>(undefined);

  const yOffSet = 220;

  const handleOnClickPopup = (slug: string) => {
    setShowPopup(slug);
    const element = document.getElementById(slug);
    if (element) {
      const rect = element.getBoundingClientRect();
      const y = rect.top + window.pageYOffset - yOffSet;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setSelectedPopupIndex(sortedPopupItems.findIndex(item => item.content.slug === slug));
    }
    setSelectedPopupSlug(selectedPopupSlug !== slug ? slug : '');
  };

  const nextPopup = (e: KeyboardEvent): void => {
    if (selectedPopupIndex > 0) {
      setSelectedPopupIndex(selectedPopupIndex - 1);
      setShowPopup(selectedPopupSlug);
      const element = document.getElementById(selectedPopupSlug);
      if (element) {
        const rect = element.getBoundingClientRect(); 
        const y = rect.top + window.pageYOffset - yOffSet;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      setSelectedPopupSlug(selectedPopupSlug === selectedPopupSlug ? '' : selectedPopupSlug);
    }
  };

  const prevPopup = (e: KeyboardEvent): void => {
    if (selectedPopupIndex < sortedPopupItems.length - 1) {
      setSelectedPopupIndex(selectedPopupIndex + 1);
      setShowPopup(selectedPopupSlug);
      const element = document.getElementById(selectedPopupSlug);
      if (element) {
        const rect = element.getBoundingClientRect();
        const y = rect.top + window.pageYOffset - yOffSet;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      setSelectedPopupSlug(selectedPopupSlug === selectedPopupSlug ? '' : selectedPopupSlug);
    }
  };

  useEffect(() => {
    setShowPopup(selectedPopupSlug);
  }, []);

  useEffect(() => {
    setSelectedPopupSlug(sortedPopupItems[selectedPopupIndex].content.slug);
  }, [selectedPopupIndex]);

  useEffect(() => {

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        // set the way of changing the popup
        setChangePopupDirection('next');
        nextPopup(e);
      } else if (e.key === 'ArrowUp') {
        // set the way of changing the popup
        setChangePopupDirection('prev');
        prevPopup(e);
      }
      // clear the way of changing the popup
      setChangePopupDirection(undefined);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextPopup]);

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

  const handleResize = () => {
    setViewWidth(getViewWidth());
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewWidth]);

  // Get the vertical position of the popup, depending on the index
  // And increase it in mobile view to able to see the point
  const getPopupVerticalPosition = (index: number): number => step * (index + 1) - 24 + (viewWidth < 768 ? step : 0);

  // Get the horizontal position of the rulers starting point
  const calculateLevelSize = (level: number): number => (level * size) * 2;

  // Get the length of the ruler
  const getRulerLength = (side: string | undefined, level: number | undefined): number => {
    const levelSize = level ? calculateLevelSize(level) : 0;

    // If the view width is smaller than the smallest breakpoint, return 0, so the ruler is not visible
    if (viewWidth < breakpoints.md) {
      return 0;
    }

    const popupPos = viewWidth < breakpoints.lg ? horisontalPositions.md.popupPos :
      viewWidth < breakpoints.xl ? horisontalPositions.lg.popupPos :
        horisontalPositions.xl.popupPos;

    const val = side === 'left' ? levelSize : side === 'right' ? -levelSize : 0;
    const length = val + popupPos;

    return length;
  };

  // Bind Point and Text hover effects
  // Point
  const [hoveredElementSlugs, setHoveredElementSlugs] = useState<string[]>([]);

  return (
    <div className="pt-5" id="cvtree">
      <Title text="Mein CV Tree" level={3} />
      <div className="relative hidden 2xs:block" id="cv"
      >
        {/* Buttons */}
        <div 
          className="absolute right-0 left-0"
          style={{ height: `${svgHeight - 150}px` }}
        >
          <div
            className={`btn-categories flex flex-wrap sm:w-[100%] mx-auto z-10 pt-3 pb-1.5 lg:p-8 backdrop-filter backdrop-blur-md justify-center ${isMenuSticky && 'shadow-lg'} transition-all duration-200 pt-[5px]`}
            style={{
              position: "sticky",
              top: "2px",
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

            {/* Arrow up */}
          <button
              onMouseUp={() => { scrollToId('home'); }}
            className="cursor-pointer"
          >
              <div className="p-3 rounded-2xl group">
                <img src={downArrow} alt="Arrow"
                  className="rotate-180 w-[.85rem] -translate-y-[.1rem] group-hover:-translate-y-[.4rem] transition-all duration-150"
                />
              </div>
            </button>

            {/* Arrow down */}
            {/* <button
              onMouseUp={() => { scrollToId('chat'); }}
              className="cursor-pointer"
            >
              <div className="p-3 rounded-2xl group">
                <img src={downArrow} alt="Arrow"
                  className="w-[.85rem] -translate-y-[.1rem] group-hover:translate-y-[.2rem] transition-all duration-150"
                />
              </div>
            </button> */}
        </div>
        </div>

        {/* svg wrapper */}
        <div className={`relative xs:container mx-auto pt-[100px] z-0`} >

          <svg
            height={svgHeight}
            width={svgWidth}
            className={`
              w-[100%]
              xl:w-[1200px]
              relative
              mx-auto
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
                      pos={[timelineHorisontalPosition, step * (i + 1) + step * .58]}
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
                      yearPos={getYearHorizontalPosition()}
                      y={yPos}
                      i={index}
                    />

                    {/* Name */}
                    <Text
                      content={content}
                      textColor={color}
                      y={yPos}
                      timelineHorisontalPosition={getTextHorizontalPosition()}
                      categoryColor={color}
                      onClick={handleOnClickPopup}
                      hoveredElementSlugs={hoveredElementSlugs}
                      setHoveredElementSlugs={setHoveredElementSlugs}
                      selectedPopupSlug={selectedPopupSlug}
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
                timelineHorisontalPosition={timelineHorisontalPosition}
              />

              {/* Point at the very end  */}
              <Point
                pos={[timelineHorisontalPosition, 0]}
                pointSize={pointSize}
                strokeWidth={pointStrokeWidth}
                color={timeline.color}
                bgColor={theme.timeline}
                isMajor={true}
                levelDistanceReduction={general.levelDistanceReduction}
                branchWidth={general.size}
                inactive={true}
              />

              {/* Points */}
              {items.map((item, i, a) => {
                const index = a.length - 1 - i;
                const color = getColor(item, filter)
                if (item.content.slug.includes('generated') || item.content.slug.includes('inactive')) return null;
                return (
                  <React.Fragment key={`point_${index}`}>
                    <Point
                      pos={[timelineHorisontalPosition, step * (index + 1)]}
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
                      end={item.content.end}
                      open={item.layout?.open}
                      selectedPopupSlug={selectedPopupSlug}
                      rulerLength={getRulerLength(item.layout?.side, item.layout?.level)}
                      onClick={handleOnClickPopup}
                      canceled={item.layout?.canceled}
                    />
                    <Popup
                      color={color}
                      content={item.content}
                      verticalPosition={getPopupVerticalPosition(index)}
                      timelineHorisontalPosition={getPopupHorizontalPosition()}
                      titleHorisontalPosition={getTitleHorizontalPosition()}
                      showPopup={showPopup}
                      setShowPopup={setShowPopup}
                      layout={item.layout}
                      selectedPopupSlug={selectedPopupSlug}
                      handleOnClickPopup={handleOnClickPopup}
                      viewWidth={viewWidth}
                      nextPopup={nextPopup}
                      prevPopup={prevPopup}
                      index={index}
                      arrLength={a.length}
                      image={images.filter(img => img.name === item.content.image)[0]}
                      side={item.layout?.side}
                      pos={[timelineHorisontalPosition, step * (index + 1)]}
                      level={item.layout?.level}
                      branchWidth={general.size}
                    />
                  </React.Fragment>
                );
              })}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CvTree;