import React from 'react';

interface IText {
  textColor: string;
  content: {
    name: string;
    year: number;
    showYear: Boolean;
    hidden?: Boolean | undefined;
  };
  y: number;
  verticalPosition?: number | undefined;
}

const Year: React.FC<IText> = ({
  textColor,
  content,
  y
}) => {
  return (
    <text x="20" y={y} fill={content.hidden ? '#777' : textColor}>{content.showYear && content.year}</text>
  );
};

const Text: React.FC<IText> = ({
  textColor,
  content,
  y,
  verticalPosition

}) => {
  return (
    <text x={verticalPosition && verticalPosition + 150} y={y} fill={content.hidden ? '#777' : textColor}>{content.name}</text>
  );
};

export { Year, Text };

