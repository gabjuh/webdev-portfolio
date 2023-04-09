import React, { useState } from 'react';

// Components
import Field from './Field';

// Data
import data from '../data/credits/credits';

interface IFields {
  fieldArray: number[];
  bigFields: { index: number; name: string; img: string; }[];
  smallFields: { index: number; name: string; img: string; }[];
  downButton: { index: number; img: string; };
  hiddenFields: number[];
  size: number;
  bigFieldSize: number;
  fieldColor: string;
  showIndexes: boolean;
  cols: number;
  activeField: number | null;
  setActiveField: React.Dispatch<React.SetStateAction<number | null>>;
  nrOfFields: number;
  scrollToId: (id: string) => void;
}

const Fields: React.FC<IFields> = ({
  fieldArray,
  bigFields,
  smallFields,
  downButton,
  hiddenFields,
  size,
  bigFieldSize,
  fieldColor,
  showIndexes,
  cols,
  activeField,
  setActiveField,
  nrOfFields,
  scrollToId,
}) => {

  const isLicensedLogo = (name: string): boolean => data.some(item => item.fieldName === name);

  return (
    <>
      {fieldArray.map(id => {
        let isBig = false;
        let type: 'button' | undefined;
        let isHidden = hiddenFields.includes(id);
        let name = '';
        let width = size;
        let height = size;
        let img = '';
        let fn = null;
        let isLicensed: boolean | undefined = false;
        const foundBigFieldObj = bigFields.find(obj => obj.index === id);
        const foundSmallFieldObj = smallFields.find(obj => obj.index === id);

        // If the field is big, set the width and height to the bigFieldSize
        if (foundBigFieldObj) {
          width = bigFieldSize;
          height = bigFieldSize;
          isBig = true;
          name = foundBigFieldObj.name;
          img = foundBigFieldObj.img;
          isLicensed = isLicensedLogo(name);
        }

        // If the field is small, set the width and height to the size
        if (foundSmallFieldObj) {
          width = size;
          height = size;
          name = foundSmallFieldObj.name;
          img = foundSmallFieldObj.img;
          isLicensed = isLicensedLogo(name);
        }

        // If the field is the downButton, set the name, typa, img and fn
        if (id === downButton.index) {
          name = 'arrow down';
          type = 'button';
          img = downButton.img;
          fn = { scrollToId, id: 'cv' };
          isLicensed = isLicensedLogo(name);
        }

        return (
          <React.Fragment key={id}>
            {/* If the field is not hidden, render it from the given props */}
            {!isHidden ? (
              <Field
                name={name}
                img={img}
                size={[width, height]}
                isBig={isBig}
                pos={[0, 0]}
                color={fieldColor}
                i={id}
                showIndexes={showIndexes}
                cols={cols}
                activeField={activeField}
                setActiveField={setActiveField}
                nrOfFields={nrOfFields}
                fn={fn} type={'button'}
                isLicensed={isLicensed}
              />
            ) : (
              // If the field is hidden, render an empty div with the same size as the field
              <div style={{ width: `${size}px`, height: `${size}px` }}></div>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Fields;