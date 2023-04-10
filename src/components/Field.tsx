import React, { useState } from 'react';

import { IFieldStyles } from '../interfaces/FieldStyles';
import { useFieldStyles } from '../helpers/generateFieldStyle';

interface IField {
  name: string;
  img: string;
  size: number[];
  isBig: boolean;
  pos: number[];
  i: number;
  showIndexes: boolean;
  cols: number;
  activeField: number | null;
  setActiveField: (i: number | null) => void;
  nrOfFields: number;
  fn?: {
    scrollToId: (id: string) => void;
    id: string;
  } | null;
  isLicensed?: boolean;
}

const Field: React.FC<IField> = ({
  name,
  img,
  size,
  isBig,
  pos,
  i,
  showIndexes,
  cols,
  activeField,
  setActiveField,
  nrOfFields,
  fn,
  isLicensed
}) => {

  const { stylesDefault, stylesOnHover, stylesOnClick, increaseOpacity } = useFieldStyles(
    nrOfFields,
    cols,
    i,
    size,
    pos,
  )

  const handleMouseEnter = () => {
    setFieldStyle(stylesOnHover)
  };

  const handleMouseLeave = () => {
    setActiveField(null)
    setTimeout(() => {
      setFieldStyle(stylesDefault)
    }, 700)
  };

  const handleOnMouseDown = () => {
    setFieldStyle(stylesOnClick)
    setActiveField(activeField === null ? i : null)
  }

  const handleOnMouseUp = () => {
    setFieldStyle(stylesOnHover)
  };

  const handleOnClick = () => {
    setFieldStyle(stylesOnClick);
    // setActiveField(null);
  }

  const [fieldStyle, setFieldStyle] = useState<IFieldStyles>(stylesDefault);

  return (
    <div
      className={`${isBig ? 'col-span-2 row-span-2 ' : ''}${!isLicensed && img ? 'border-red-500 border-[3px] ' : ''}relative group mx-auto rounded-2xl hover:-translate-y-[4px] hover:-translate-x-[1px] transition-all group`}
      style={fieldStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleOnMouseDown}
      onMouseUp={!fn ? handleOnMouseUp : () => fn.scrollToId(fn.id)}
      // onClick={handleOnClick}
    >
      <div className="text-center h-[100%]">
        <div className="absolute top-[50%] -translate-y-[56%] left-0 right-0">
          <span className="absolute -top-3 left-1 text-[#999] text-[.6rem]">{showIndexes && i}</span>
          <img
            className={`absolute max-w-[50%] group-hover:!opacity-1)] transition-all duration-200 left-0 right-0 mx-auto top-[50%] -translate-y-[50%] group-hover:drop-shadow-[0_0_10px_rgba(50,255,235,.4)] ${name === 'arrow down' ? '!w-[15px]' : ''}`}
            style={{
              opacity: isBig ? .85 : increaseOpacity(0.6, i)
            }}
            src={img}
            alt={name}
          />
        </div>
      </div>
    </div>
  );
};

export default Field;