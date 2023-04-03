import React, { useState, useEffect } from 'react';
import { IContent, ILayout } from '../interfaces/Tree';
import { Text } from './Text';

interface IPopup {
  color: string;
  content: IContent;
  timelineHorisontalPosition: number;
  titleHorisontalPosition: number;
  verticalPosition: number;
  showPopup?: string;
  setShowPopup: any;
  layout?: ILayout;
  selectedPopupSlug: string;
  handleOnClickPopup: any;
  viewWidth: number;
  nextPopup?: any;
  prevPopup?: any;
  index: number;
  arrLength: number;
}

const Popup: React.FC<IPopup> = ({
  color,
  content,
  timelineHorisontalPosition,
  titleHorisontalPosition,
  verticalPosition,
  showPopup,
  setShowPopup,
  layout,
  selectedPopupSlug,
  handleOnClickPopup,
  viewWidth,
  nextPopup,
  prevPopup,
  index,
  arrLength
}) => {

  const contentId: string = `content_${content.slug}`;
  const [contentHeight, setContentHeight] = useState<number>(240);
  const showCategories: boolean = true;

  const x = timelineHorisontalPosition;
  const y = verticalPosition;

  const Categories = () =>
    <p className="text-xs opacity-70 mb-1" style={{ color: color }}>
      {Array.isArray(content.categories) ? content.categories.map((category: string, index: number, array: Array<string>) => `${category.toUpperCase()}${index !== array.length - 1 ? ' | ' : ''}`).join('') : ''}
    </p>;

  const Button = (label: string, url: string) =>
    <div className="mt-4">
      <a className="btn btn-xs px-3 py-1 rounded-sm bg-blue-500 hover:bg-blue-600 text-white border-none" style={{ backgroundColor: `${color}` }} href={url} download>{label}</a>
    </div>

  const Link = (label: string, url: string) =>
    <div className="my-4">
      <a className="py-1 text-xs" style={{ color: `${color}` }} href={url} target="_blank" rel="noreferrer">{label}</a>
    </div>

  const getContentHeight = (): number => {
    const contentElement = document.querySelector(`#${contentId}`);
    if (contentElement instanceof HTMLElement) {
      return contentElement.offsetHeight;
    }
    return 0;
  };

  useEffect(() => {
    setContentHeight(getContentHeight() + 70);
  }, []);

  const isArrowUpClickable = () => !(index <= 1);

  const isArrowDownClickable = () => !(arrLength <= index + 1);

  const handleOnClickArrowUp = () => isArrowUpClickable() && prevPopup();

  const handleOnClickArrowDown = () => isArrowDownClickable() && nextPopup();

  return (
    <>
      <g
        className={`${showPopup !== content.slug && 'invisible opacity-0'} transition-all duration-[.5s] relative block drop-shadow-lg`}

      >
        {/* popup frame */}
        <rect
          fill="#fff"
          stroke={color}
          strokeWidth="1.5"
          x={x}
          y={y}
          width={viewWidth > 470 ? 400 : 360}
          height={contentHeight}
          rx="8" ry="8"
        />

        {/* Title */}
        <Text
          content={content}
          textColor="#222"
          bgColor="#eee"
          y={y + 35}
          // timelineHorisontalPosition={timelineHorisontalPosition - 570}
          timelineHorisontalPosition={titleHorisontalPosition}
          categoryColor={color}
          onClick={handleOnClickPopup}
          showPopup={{ showPopup, setShowPopup }}
        />
        {/* <image x={x + 155} y={y + 10} href={icoBoy} height="18" width="18" /> */}

        {/* Close button */}
        <text
          className="cursor-pointer"
          x={x + (viewWidth > 470 ? 364 : 325)} y={y + 35} fontSize="21" fill="#444"
          onClick={handleOnClickPopup}
        >
          &#x2715;
        </text>

        {/* Up arrow to previous popup */}
        <g color="#f00">
          <text
            className={isArrowUpClickable() ? 'cursor-pointer' : ''}
            fill={isArrowUpClickable() ? '#666' : '#ddd'}
            x={x + (viewWidth > 470 ? 364 : 325)}
            y={y + 80}
            fontSize="21"
            onClick={handleOnClickArrowUp}
        >
          &#8593;
        </text>
        </g>

        {/* Down arrow to next popup */}
        <text
          className={isArrowDownClickable() ? 'cursor-pointer' : ''}
          fill={isArrowDownClickable() ? '#666' : '#ddd'}
          x={x + (viewWidth > 470 ? 364 : 325)}
          y={y + 100}
          fontSize="21"
          onClick={handleOnClickArrowDown}
        >
          &#8595;
        </text>

        {/* Content */}
        <foreignObject
          className="overflow-auto"
          x={x + 25} y={y + 48}
          fontSize="15" fill="#444"
          width={viewWidth > 470 ? 330 : 290}
          height={contentHeight}
        >
          <div id={contentId} className="" >
            {/* Name */}
            <p className="absolute top-[-1.8rem] md:invisible visible lg:visible text-[12pt] ">{content.name}</p>

            {/* Place */}
            <p className="text-md font-[600]">{content.institute}</p>

            {/* Type of Taetigkeit */}
            <p className="text-sm italic">{content.typeOfActivity}</p>

            {/* Year-year */}
            <p className="font-[300] my-1 text-xs">{`${''}${content.year}${content.end && content.year !== content.end ? ` - ${content.end}` : ''}`}</p>

            {/* Categories */}
            {showCategories && <Categories />}

            {/* Description */}
            {content.description && content.description.split('|').map((item, index) => <p key={index} className="my-4 opacity-70">{item}</p>)}

            {/* Link */}
            {content.link && Link('Mehr...', content.link)}

            {/* Tech */}
            <div className="-mt-1 mb-1">
              <>
                {content.tech?.map((tech: string, i: number, a: string[]) =>
                  <React.Fragment key={`tech_${tech}_${i}`}>
                    <p className="whitespace-normal inline-block">
                    <span
                    key={`${content.slug}_tech_${i}`}
                      className="text-[#eee] text-[.65rem] bg-[#444] mr-1 px-2 rounded-md whitespace-nowrap"
                  >
                    {tech}
                    </span>
                    </p>
                  </React.Fragment>
                )
                }
              </>
            </div>

            {/* Certificate */}
            {content.certificate && Button('Zertifikat', content.certificate)}

            {/* Recommendation */}
            {content.recommendation && Button('Empfehlungsbrief', content.recommendation)}

          </div>
        </foreignObject>

      </g>
    </>
  );
};

export default Popup;