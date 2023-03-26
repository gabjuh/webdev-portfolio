import React, { useState } from 'react';
import Field from './Field';
import Hero from './Hero';
import bigFields from '../data/stack/bigFields';
import smallFields from '../data/stack/smallFields';
import hiddenFields from '../data/stack/hiddenFields';
import downButton from '../data/stack/downButton';
import { scrollToId } from '../helpers/pageNavigation';
import Prompt from './Prompt';

const Stack: React.FC = ({ }) => {

  const [showIndexes, setShowIndexes] = useState<Boolean>(false);
  const size: number = 60;
  const bigFieldSize: number = size * 2.3;
  const cols: number = 10;
  const gap: number = 17;
  const nrOfFields: number = 90;

  const [activeField, setActiveField] = useState<number | null>(null);

  // If bigFields includes the activeField as its index, return it
  const getNameOfActiveField = (activeField: number | null) => {
    let item;
    item = bigFields.find(item => item.index === activeField);
    if (!item) item = smallFields.find(item => item.index === activeField);
    return item ? item.name : '';
  }

  const skipList: number[] = [];

  // Skip items, that has index:
  // n + 1, 
  // n + cols, 
  // n + cols + 1,
  bigFields.forEach(item => {
    skipList.push(item.index + 1, item.index + cols, item.index + cols + 1);
  });

  const fieldArray = [...Array(nrOfFields)].map((_, i) => i).filter(id => !skipList.includes(id));

  return (
    <>
      <div className="container lg:h-[100vh] min-h-[1000px] mx-auto lg:py-10] lg:mt-10" id="stack">
        <div className={`relative max-w-[1020px] mx-auto`} style={{ transform: "perspective(2500px) rotateX(20deg)" }}>
          <div className="relative">
            <div className="grid grid-cols-8">
              <div className={`md:grid lg:col-span-6 col-span-8 max-w-[770px] mx-auto hidden`}
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                  gap: `${gap}px`
                }}
              >

                {fieldArray.map(id => {
                  let isBig = false;
                  let type: 'empty' | 'normal' | 'smallWithIco' | '2x1' | '2x2' | 'button' = 'normal';
                  let isHidden = hiddenFields.includes(id);
                  let name = '';
                  let width = size;
                  let height = size;
                  let img = '';
                  let fn = null;
                  const foundBigFieldObj = bigFields.find(obj => obj.index === id);
                  const foundSmallFieldObj = smallFields.find(obj => obj.index === id);

                  if (foundBigFieldObj) {
                    width = bigFieldSize;
                    height = bigFieldSize;
                    isBig = true;
                    type = '2x2';
                    name = foundBigFieldObj.name;
                    img = foundBigFieldObj.img;
                  }

                  if (foundSmallFieldObj) {
                    width = size;
                    height = size;
                    name = foundSmallFieldObj.name;
                    img = foundSmallFieldObj.img;
                  }

                  if (id === downButton.index) {
                    name = 'down_arrow';
                    type = 'button';
                    img = downButton.img;
                    fn = { scrollToId, id: 'cv' };
                  }

                  return (
                    <React.Fragment key={id}>
                      {!isHidden ? (
                        <Field
                          name={name}
                          img={img}
                          size={[width, height]}
                          isBig={isBig}
                          type={type}
                          pos={[0, 0]}
                          color="#464"
                          i={id}
                          showIndexes={showIndexes}
                          cols={cols}
                          activeField={activeField}
                          setActiveField={setActiveField}
                          nrOfFields={nrOfFields}
                          fn={fn}
                        />
                      ) : (
                        <div style={{ width: `${size}px`, height: `${size}px` }}></div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="lg:col-span-2 col-span-8 lg:order-1 -order-1">
                <Hero scrollToId={scrollToId} />
              </div>
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