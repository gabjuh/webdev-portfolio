import React from 'react';
import { IText } from '../interfaces/Text';

const Year: React.FC<IText> = ({
  textColor,
  content,
  y,
  i
}) => {
  return (
    <text x="20" y={y} fill={content.hidden ? '#777' : textColor}>{content.showYear && content.year}</text>
  );
};

const Text: React.FC<IText> = ({
  textColor,
  content,
  y,
  horisontalPosition
}) => {


  const Tech = () => {
    return (
      <>
        {
          content.tech?.map((tech: string, i: number) => {
            return (
              <tspan key={`tech_${i}`} floodColor="#f00">{tech} </tspan>
            );
          })
        }
      </>
    );
  }


  return (
    <>
      {/* Name */}
      <text x={horisontalPosition && horisontalPosition + 150} y={y} fill={content.hidden ? '#777' : textColor}>
        <tspan fontWeight="500">{content.name}</tspan>
        {/* Institute */}
        {content.institute && (
          <tspan fontWeight="200"> – {content.institute}</tspan>
        )}

      </text>
      {content.tech && (
        <text fontSize="12" x={horisontalPosition && horisontalPosition + 150} y={y + 18} fill={content.hidden ? '#777' : textColor}>{<Tech />}</text>
      )}
    </>
  );
};

export { Year, Text };

