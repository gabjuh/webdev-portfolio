import React, { useState, useEffect } from 'react';

// Components
import { IFieldStyles } from '../interfaces/FieldStyles';
import { IField } from '../interfaces/Field';

// Hooks
import { useFieldStyles } from '../helpers/generateFieldStyle';

// Helpers
import { getViewWidth } from '../helpers/getViewWidth';

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

  // Generate the styles for the field and use its helpers
  const { stylesDefault, stylesOnHover, stylesOnClick, increaseOpacity } = useFieldStyles(
    nrOfFields,
    cols,
    i,
    size,
    pos,
  )

  // Set the field style
  const [fieldStyle, setFieldStyle] = useState<IFieldStyles>(stylesDefault);

  // By hover the field lifts up
  const handleMouseEnter = () => {
    setFieldStyle(stylesOnHover)
  };

  // By leaving the field, it goes back to its default style
  const handleMouseLeave = () => {
    setActiveField(null)
    setTimeout(() => {
      setFieldStyle(stylesDefault)
    }, 700)
  };

  // By clicking the field, it goes down to the clicked style
  const handleOnMouseDown = () => {
    setFieldStyle(stylesOnClick)
    setActiveField(activeField === null ? i : null)
  }

  // By releasing the mouse button, the field goes back to its default style (to the hovered style)
  const handleOnMouseUp = () => {
    setFieldStyle(stylesOnHover)
  };

  // View width
  const [viewWidth, setViewWidth] = useState<number>(getViewWidth());

  // Resize event listener
  const handleResize = () => {
    setViewWidth(getViewWidth());
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setFieldStyle(stylesDefault);
    setViewWidth(getViewWidth());
  }, [viewWidth]);

  return (
    <div
      className={`${isBig ? 'col-span-2 row-span-2 ' : ''}${!isLicensed && img ? 'border-red-500 border-[3px] ' : ''}relative group mx-auto rounded-2xl hover:-translate-y-[4px] hover:-translate-x-[1px] transition-all group`}
      style={fieldStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleOnMouseDown}
      onMouseUp={!fn ? handleOnMouseUp : () => fn.scrollToId(fn.id)}
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