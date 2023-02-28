import React from 'react';

interface IText {
  textColor: string;
  content: {
    name: string;
    year: number;
  };
  y: number;


}

const Year: React.FC<IText> = ({
  textColor,
  content,
  y
}) => {
  return (
    <text x="20" y={y} fill={textColor}>{content.year}</text>
  );
};

const Text: React.FC<IText> = ({
  textColor,
  content,
  y
}) => {
  return (
    <text x="250" y={y} fill={textColor}>{content.name}</text>
  );
};

export { Year, Text };

