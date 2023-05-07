import React from 'react';
import { getViewWidth } from '../helpers/getViewWidth';

interface ITitle {
  text: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const sizes = ['1rem', '1.5rem', '2rem', '2.5rem', '3rem', '3.5rem'];

const Title: React.FC<ITitle> = ({ text, level }) => {

  return (
    <h1
      className="text-center mb-16"
      style={{
        fontSize: sizes[level ? level - 1 : 0],
      }}
    >
      {text}
    </h1>
  );
};

export default Title;