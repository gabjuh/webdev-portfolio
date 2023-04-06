import React, { useState } from 'react';
import { IText, IYear } from '../interfaces/Text';

const Year: React.FC<IYear> = ({
  textColor,
  content,
  y,
  i,
  yearPos,
}) => {

  const showIndex: boolean = false
  
  return (
    <text x={yearPos} y={y} fill={content.hidden ? '#777' : textColor}>{showIndex && i + ' '}{content.showYear && content.year}</text>
  );
};

const Text: React.FC<IText> = ({
  textColor,
  content,
  y,
  timelineHorisontalPosition,
  onClick,
  isPopupText,
  hoveredElementSlugs,
  setHoveredElementSlugs,
  selectedPopupSlug
}) => {

  const [isOnHover, setIsOnHover] = useState(false);
  const [currentColor, setCurrentColor] = useState(textColor);


  const handleMouseEnter = () => {
    setIsOnHover(true);
    setCurrentColor('#333');
    const arr = [...hoveredElementSlugs];
    arr?.push(content.slug);
    setHoveredElementSlugs(arr);
  };

  const handleMouseLeave = () => {
    setIsOnHover(false);
    const el = document.querySelector(`${content.slug}_id`) as SVGTextElement;
    setTimeout(() => {
      setCurrentColor(textColor);
      const arr = [...hoveredElementSlugs];
      arr.splice(arr.indexOf(content.slug), 1);
      setHoveredElementSlugs(arr);
    }, 500);
  };

  return (
    <g>

      {/* Name */}
      <text
        id={`${content.slug}_id`}
        className={`hidden sm:block transition duration-[300ms] ease-in-out ${`drop-shadow-[0_0_2px_rgba(235,235,235,1)]`} ${isPopupText ? 'sm:-translate-y-[55px] md:translate-y-0' : ''}`}
        fill={selectedPopupSlug === content.slug ? '#000' : currentColor}
        x={timelineHorisontalPosition && timelineHorisontalPosition + 190}
        y={y}
      >
        <tspan fontWeight="450">{content.name}</tspan>
        {/* ico */}

      </text>

      {/* Clickable area */}
      <g
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>

        <rect
          onClick={() => onClick(content.slug)}
          className="cursor-pointer"
          x={100}
          y={y - 30}
          width={700}
          height="45"
          fill="#f000"

        />
      </g>
    </g>
  );
};

export { Year, Text };

