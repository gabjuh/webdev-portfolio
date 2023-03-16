import React from 'react';
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
  categoryColor
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

  const Category = () => {
    return (        
      <>
        {/* Background rectsquare */}
        <rect x={horisontalPosition && horisontalPosition + 130} y={y - 18} width="45" height="24" rx="8" ry="8" fill={categoryColor} />

        {/* Category text */}
        <text x={horisontalPosition && horisontalPosition + 137} y={y - 2}>
          <tspan fontSize=".6rem" fill="#fff" >{content.label.toUpperCase()}</tspan>
        </text>
      </>
    )
  }


  return (
    <g>
      {/* Category */}
      {content.label && <Category />}

      {/* Name */}
      <text className="hidden md:block" x={horisontalPosition && horisontalPosition + 190} y={y} fill={content.hidden ? '#777' : textColor}>
        <tspan fontWeight="400">{content.name}</tspan>
        {/* Institute */}
        {/* {content.institute && (
          <tspan fontWeight="100" fontSize="13"> – {content.institute}</tspan>
        )} */}

      </text>
      {/* {content.tech && (
        <text fontSize="12" x={horisontalPosition && horisontalPosition + 210} y={y + 18} fill={content.hidden ? '#777' : textColor}>{<Tech />}</text>
      )} */}
    </g>
  );
};

export { Year, Text };

