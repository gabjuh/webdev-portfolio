import React from 'react';

interface IText {
  textColor: string;
  content: {
    slug: string;
    name: string;
    year: number;
    showYear: Boolean;
    end?: number | undefined;
    hidden?: Boolean | undefined;
  };
  y: number;
  verticalPosition?: number | undefined;
  i?: number;
}

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
  verticalPosition

}) => {
  return (
    <text x={verticalPosition && verticalPosition + 150} y={y} fill={content.hidden ? '#777' : textColor}>{content.name}</text>
  );
};

export { Year, Text };

