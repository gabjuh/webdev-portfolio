import React from 'react';

interface IField {
  name: string;
  img: string;
  size: number;
  isBigger: Boolean;
  pos: number[];
  color: string;
  i: number;
  showIndexes: Boolean;
  cols: number;
}

const Field: React.FC<IField> = ({
  name,
  img,
  size,
  isBigger,
  pos,
  color,
  i,
  showIndexes,
  cols
}) => {

  const generateFirstColor = (i: number, cols: number): string => {
    const [r, g, b, a] = [255 - i * 2, 255 - i, 255 - i * 3, 0.3 + i * 0.001];
    return `rgba(${r},${g},${b},${a})`;
  };

  const generateSecondColor = (i: number, cols: number): string => {
    const [r, g, b, a] = [200, 200, 192, 0.3 + i * 0.001];
    return `rgba(${r},${g},${b},${a})`;
  };

  return (
    <div
      className={`relative mx-auto rounded-2xl shadow-md ${isBigger && 'col-span-2 row-span-2'} hover:-translate-y-[4px] hover:-translate-x-[1px] hover:shadow-[8px_8px_13px_rgba(56,97,109,.4)] transition-all duration-200`}
      style={{
        height: `${size}px`,
        width: `${size}px`,
        left: `${pos[0]}px`,
        right: 0,
        background: `linear-gradient(120deg, ${generateFirstColor(i, cols)}, ${generateSecondColor(i, cols)})`
      }}
    >
      <div className="text-center h-[100%]">
        <div className="absolute top-[50%] -translate-y-[56%] left-0 right-0">
          <span className="absolute -top-3 -left-1 text-[#999]">{showIndexes && i}</span>
          {/* <span className="text-[#666] text-xl">{name}</span> */}
          <img className="absolute w-[50%] left-0 right-0 mx-auto top-[50%] -translate-y-[50%]" src={img} alt={name} />
        </div>
      </div>
    </div>
  );
};

export default Field;