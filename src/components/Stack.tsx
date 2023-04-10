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
import fieldConfig from '../config/field.conf';
import fieldsConfig from '../config/fields.conf';

// Interfaces
import FieldConfig from '../interfaces/FieldConfig';
import FieldsConfig from '../interfaces/FieldsConfig';

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

  // Fields and Grid settings
  const { cols, gap, nrOfFields }: FieldsConfig = fieldsConfig;

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