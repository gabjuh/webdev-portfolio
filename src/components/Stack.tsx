import React, { useState } from 'react';

// Components
import Field from './Field';
import Hero from './Hero';
import Prompt from './Prompt';

// Data
import bigFields from '../data/stack/bigFields';
import smallFields from '../data/stack/smallFields';
import hiddenFields from '../data/stack/hiddenFields';
import downButton from '../data/stack/downButton';

// Helpers
import { scrollToId } from '../helpers/pageNavigation';

const Stack: React.FC = () => {

  // States
  const [showIndexes, setShowIndexes] = useState<Boolean>(false);
  const [activeField, setActiveField] = useState<number | null>(null);

  // Consts
  // Field size
  const size: number = 60;
  const bigFieldSize: number = size * 2.3;
  const fieldColor: string = '#464';

  // Grid
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

  const Fields = () => {
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
          const foundBigFieldObj = bigFields.find(obj => obj.index === id);
          const foundSmallFieldObj = smallFields.find(obj => obj.index === id);

          // If the field is big, set the width and height to the bigFieldSize
          if (foundBigFieldObj) {
            width = bigFieldSize;
            height = bigFieldSize;
            isBig = true;
            name = foundBigFieldObj.name;
            img = foundBigFieldObj.img;
          }

          // If the field is small, set the width and height to the size
          if (foundSmallFieldObj) {
            width = size;
            height = size;
            name = foundSmallFieldObj.name;
            img = foundSmallFieldObj.img;
          }

          // If the field is the downButton, set the name, typa, img and fn
          if (id === downButton.index) {
            name = 'down_arrow';
            type = 'button';
            img = downButton.img;
            fn = { scrollToId, id: 'cv' };
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

  return (
    <>
      <div className="container lg:h-[100vh] mx-auto lg:py-10] lg:mt-10" id="stack">
        <div className={`relative max-w-[1020px] mx-auto`} style={{ transform: "perspective(2500px) rotateX(20deg)" }}>
          <div className="relative">
            <div className="grid grid-cols-8">
              <div className={`md:grid lg:col-span-6 col-span-8 max-w-[770px] mx-auto hidden`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: `${gap}px` }}>
                <Fields />
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