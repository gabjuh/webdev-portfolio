import React, { useState } from 'react';

// Components
import Fields from './Fields';
import Hero from './Hero';
import Prompt from './Prompt';

// Data
import bigFields from '../data/stack/bigFields';
import smallFields from '../data/stack/smallFields';
import hiddenFields from '../data/stack/hiddenFields';
import downButton from '../data/stack/downButton';

// Config
import { fieldConfig } from '../config/field.conf';

// Interfaces
import FieldConfig from '../interfaces/FieldConfig';

// Helpers
import { scrollToId } from '../helpers/pageNavigation';

const Stack: React.FC = () => {

  // Show indexes in order to able to identify and change fields
  const [showIndexes, setShowIndexes] = useState<boolean>(false);

  // The active field is the field that is hovered or clicked
  const [activeField, setActiveField] = useState<number | null>(null);

  // Field settings
  const { size, bigFieldSizeFactor, fieldColor }: FieldConfig = fieldConfig;
  const bigFieldSize: number = size * bigFieldSizeFactor;

  // Grid settings
  const cols: number = 10;
  const gap: number = 17;
  const nrOfFields: number = 90;

  // The given indeses in the skipList will be skipped from rendering
  const skipList: number[] = [];

  // If bigFields includes the activeField as its index, return it
  const getNameOfActiveField = (activeField: number | null) => {
    let item;
    item = bigFields.find(item => item.index === activeField);
    if (!item) item = smallFields.find(item => item.index === activeField);
    return item ? item.name : '';
  }

  // Skip items, that are covered by the bigFields:
  // on the right sode:           n + 1,
  // below:                       n + cols,
  // below and one to the right:  n + cols + 1,
  bigFields.forEach(item => {
    skipList.push(item.index + 1, item.index + cols, item.index + cols + 1);
  });

  // Create an array with the given number of fields
  const fieldArray = [...Array(nrOfFields)].map((_, i) => i).filter(id => !skipList.includes(id));

  // const Fields = () => {

  //   const [licensedLogos, setLicensedLogos] = useState<string[]>([]);

  //   const addLicensedLogo = (name: string) => {
  //     setLicensedLogos(prev => [...prev, name]);
  //   };

  //   const isLicensedLogo = (name: string): boolean => data.some(item => item.fieldName === name)

  //   return (
  //     <>
  //       {fieldArray.map(id => {
  //         let isBig = false;
  //         let type: 'button' | undefined;
  //         let isHidden = hiddenFields.includes(id);
  //         let name = '';
  //         let width = size;
  //         let height = size;
  //         let img = '';
  //         let fn = null;
  //         let isLicensed: boolean | undefined = false;
  //         const foundBigFieldObj = bigFields.find(obj => obj.index === id);
  //         const foundSmallFieldObj = smallFields.find(obj => obj.index === id);

  //         // If the field is big, set the width and height to the bigFieldSize
  //         if (foundBigFieldObj) {
  //           width = bigFieldSize;
  //           height = bigFieldSize;
  //           isBig = true;
  //           name = foundBigFieldObj.name;
  //           img = foundBigFieldObj.img;
  //           isLicensed = isLicensedLogo(name);
  //         }

  //         // If the field is small, set the width and height to the size
  //         if (foundSmallFieldObj) {
  //           width = size;
  //           height = size;
  //           name = foundSmallFieldObj.name;
  //           img = foundSmallFieldObj.img;
  //           isLicensed = isLicensedLogo(name);
  //         }

  //         // If the field is the downButton, set the name, typa, img and fn
  //         if (id === downButton.index) {
  //           name = 'arrow down';
  //           type = 'button';
  //           img = downButton.img;
  //           fn = { scrollToId, id: 'cv' };
  //           isLicensed = isLicensedLogo(name);
  //         }

  //         return (
  //           <React.Fragment key={id}>
  //             {/* If the field is not hidden, render it from the given props */}
  //             {!isHidden ? (
  //               <Field
  //                 name={name}
  //                 img={img}
  //                 size={[width, height]}
  //                 isBig={isBig}
  //                 pos={[0, 0]}
  //                 color={fieldColor}
  //                 i={id}
  //                 showIndexes={showIndexes}
  //                 cols={cols}
  //                 activeField={activeField}
  //                 setActiveField={setActiveField}
  //                 nrOfFields={nrOfFields}
  //                 fn={fn} type={'button'}
  //                 isLicensed={isLicensed}
  //               />
  //             ) : (
  //               // If the field is hidden, render an empty div with the same size as the field
  //               <div style={{ width: `${size}px`, height: `${size}px` }}></div>
  //             )}
  //           </React.Fragment>
  //         );
  //       })}
  //     </>
  //   );
  // };

  return (
    <>
      <div className="container lg:h-[800px] mx-auto lg:py-10] lg:mt-10" id="stack">
        <div className={`relative max-w-[1020px] mx-auto stacks-transform`}>
          <div className="relative">
            <div className="grid grid-cols-8">
              <div className={`lg:grid lg:col-span-6 col-span-8 max-w-[770px] mx-auto hidden`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: `${gap}px` }}>
                <Fields
                  fieldArray={fieldArray}
                  bigFields={bigFields}
                  smallFields={smallFields}
                  downButton={downButton}
                  hiddenFields={hiddenFields}
                  size={size}
                  bigFieldSize={bigFieldSize}
                  fieldColor={fieldColor}
                  cols={cols}
                  nrOfFields={nrOfFields}
                  showIndexes={showIndexes}
                  activeField={activeField}
                  setActiveField={setActiveField}
                  scrollToId={scrollToId}
                />
              </div>
              <Hero scrollToId={scrollToId} />
            </div>
            <Prompt
              prompt={getNameOfActiveField(activeField)}
              activeField={activeField}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Stack;