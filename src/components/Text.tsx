import React, { useState } from 'react';
import { IText, IYear } from '../interfaces/Text';

const Year: React.FC<IYear> = ({
  textColor,
  content,
  y,
  i
}) => {

  const showIndex: boolean = false
  
  return (
    <text x="20" y={y} fill={content.hidden ? '#777' : textColor}>{showIndex && i + ' '}{content.showYear && content.year}</text>
  );
};

const Text: React.FC<IText> = ({
  textColor,
  content,
  y,
  horisontalPosition,
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

  return (
    <g>

      {/* Name */}
      <text
        id={content.slug}
        className={`hidden md:block transition-all duration-[400ms] ease-in-out ${content.categories !== 'private' ? 'cursor-pointer' : 'cursor-default'}`}
        onMouseEnter={e => handleMouseEnter(e)}
        onMouseLeave={e => handleMouseLeave(e)}
        onClick={e => content.categories !== 'private' && onClick(e)}
        fill={content.hidden ? '#777' : textColor}
        x={horisontalPosition && horisontalPosition + 140}
        y={y}
      >
        <tspan fontWeight="450">{content.name}</tspan>
        {/* ico */}

      </text>
    </g>
  );
};

export { Year, Text };

