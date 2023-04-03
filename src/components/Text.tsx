import React, { useState } from 'react';
import { IText, IYear } from '../interfaces/Text';

const Year: React.FC<IYear> = ({
  textColor,
  content,
  y,
  i,
  timelineHorisontalPosition
}) => {

  const showIndex: boolean = false
  
  return (
    <text x={timelineHorisontalPosition - 180} y={y} fill={content.hidden ? '#777' : textColor}>{showIndex && i + ' '}{content.showYear && content.year}</text>
  );
};

const Text: React.FC<IText> = ({
  textColor,
  content,
  y,
  timelineHorisontalPosition,
  categoryColor,
  onClick,
}) => {

  const Tech = () => {
    return (
      <>
        {
          content.tech?.map((tech: string, i: number, a: string[]) => {
            return (
              <tspan key={`tech_${i}`} fill="#888">{tech} {i < a.length - 1 && ' | '}</tspan>
            );
          })
        }
      </>
    );
  }

  const handleMouseEnter = (e: React.MouseEvent<SVGTextElement, MouseEvent>) => {
    e.currentTarget.setAttribute('fill', '#333');
  };

  const handleMouseLeave = (e: React.MouseEvent<SVGTextElement, MouseEvent>) => {
    const el = e.currentTarget;
    setTimeout(() => {
      el.setAttribute('fill', content.hidden ? '#777' : textColor);
    }, 800);
  };

  // const handleOnClickShake = (e: React.MouseEvent<SVGTextElement, MouseEvent>) => {
  //   const target = e.currentTarget;
  //   target.classList.add('animate-shake');
  //   setTimeout(() => {
  //     target.classList.remove('animate-shake');
  //   }, 1000);
  // };

  return (
    <g>

      {/* Name */}
      <text
        id={content.slug}
        className={`hidden md:block transition-all duration-[400ms] ease-in-out ${`drop-shadow-[0_0_2px_rgba(235,235,235,1)] cursor-pointer`}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        fill={content.hidden ? '#777' : textColor}
        x={timelineHorisontalPosition && timelineHorisontalPosition + 190}
        y={y}
      >
        <tspan fontWeight="450">{content.name}</tspan>
        {/* ico */}

      </text>
    </g>
  );
};

export { Year, Text };

