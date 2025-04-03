import React, { useEffect, useState } from 'react';

// import downButtonMobile from '../data/stack/downButtonMobile';
// Config
import fieldConfig from '../configs/field.conf';
import fieldConfigMobile from '../configs/fieldMobile.conf';
import fieldsConfig from '../configs/fields.conf';
import fieldsConfigMobile from '../configs/fieldsMobile.conf';
import fieldsConfigTablet from '../configs/fieldsTablet.conf';
import fieldConfigTablet from '../configs/fieldTablet.conf';
// Data Desktop
import bigFields from '../data/stack/bigFields';
// import downButtonTablet from '../data/stack/downButtonTablet';
// Data Mobile
import bigFieldsMobile from '../data/stack/bigFieldsMobile';
// Data Tablet
import bigFieldsTablet from '../data/stack/bigFieldsTablet';
import downButton from '../data/stack/downButton';
import hiddenFields from '../data/stack/hiddenFields';
import hiddenFieldsMobile from '../data/stack/hiddenFieldsMobile';
import hiddenFieldsTablet from '../data/stack/hiddenFieldsTablet';
import smallFields from '../data/stack/smallFields';
import smallFieldsMobile from '../data/stack/smallFieldsMobile';
import smallFieldsTablet from '../data/stack/smallFieldsTablet';
import { getViewWidth } from '../helpers/getViewWidth';
// Helpers
import { scrollToId } from '../helpers/pageNavigation';
// Interfaces
// import FieldConfig from '../interfaces/FieldConfig';
// import FieldsConfig from '../interfaces/FieldsConfig';
import IBigField from '../interfaces/BigField';
// Components
import Fields from './Fields';
import Prompt from './Prompt';
import Title from './Title';

const Stack: React.FC = () => {

  // View width
  const [viewWidth, setViewWidth] = useState<number>(getViewWidth());

  // Show indexes in order to able to identify and change fields
  const [showIndexes, setShowIndexes] = useState<boolean>(false);

  // The active field is the field that is hovered or clicked
  const [activeField, setActiveField] = useState<number | null>(null);

  // Field settings
  // const { size, bigFieldSizeFactor, fieldColor }: FieldConfig = fieldConfig;
  const [size, setSize] = useState<number>(
    viewWidth > 768 ? fieldConfig.size :
      viewWidth > 480 ? fieldConfigTablet.size :
        fieldConfigMobile.size);

  const [bigFieldSizeFactor, setBigFieldSizeFactor] = useState<number>(
    viewWidth > 768 ? fieldConfig.bigFieldSizeFactor :
      viewWidth > 480 ? fieldConfigTablet.bigFieldSizeFactor :
        fieldConfigMobile.bigFieldSizeFactor);

  const [fieldColor, setFieldColor] = useState<string>(
    viewWidth > 768 ? fieldConfig.fieldColor :
      viewWidth > 480 ? fieldConfigTablet.fieldColor :
        fieldConfigMobile.fieldColor);

  // Set the size of the big fields
  const bigFieldSize: number = size * bigFieldSizeFactor;

  // Fields and Grid settings
  // const { cols, gap, nrOfFields }: FieldsConfig = fieldsConfig;
  const [cols, setCols] = useState<number>(
    viewWidth > 768 ? fieldsConfig.cols :
      viewWidth > 480 ? fieldsConfigTablet.cols :
        fieldsConfigMobile.cols);

  const [gap, setGap] = useState<number>(
    viewWidth > 768 ? fieldsConfig.gap :
      viewWidth > 480 ? fieldsConfigTablet.gap :
        fieldsConfigMobile.gap);

  const [nrOfFields, setNrOfFields] = useState<number>(
    viewWidth > 768 ? fieldsConfig.nrOfFields :
      viewWidth > 480 ? fieldsConfigTablet.nrOfFields :
        fieldsConfigMobile.nrOfFields);

  const [bigFieldsLayout, setBigFieldsLayout] = useState<IBigField[]>(
    viewWidth > 768 ? bigFields :
      viewWidth > 480 ? bigFieldsTablet :
        bigFieldsMobile);

  const [smallFieldsLayout, setSmallFieldsLayout] = useState<IBigField[]>(
    viewWidth > 768 ? smallFields :
      viewWidth > 480 ? smallFieldsTablet :
        smallFieldsMobile);

  const [hiddenFieldsLayout, setHiddenFieldsLayout] = useState<number[]>(
    viewWidth > 768 ? hiddenFields :
      viewWidth > 480 ? hiddenFieldsTablet :
        hiddenFieldsMobile);

  // Resize event listener
  const handleResize = () => {
    setViewWidth(getViewWidth());
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (viewWidth > 768) {
      setSize(fieldConfig.size);
      setBigFieldSizeFactor(fieldConfig.bigFieldSizeFactor);
      setFieldColor(fieldConfig.fieldColor);
      setCols(fieldsConfig.cols);
      setGap(fieldsConfig.gap);
      setNrOfFields(fieldsConfig.nrOfFields);

    } else if (viewWidth > 480) {
      setSize(fieldConfigTablet.size);
      setBigFieldSizeFactor(fieldConfigTablet.bigFieldSizeFactor);
      setFieldColor(fieldConfigTablet.fieldColor);
      setCols(fieldsConfigTablet.cols);
      setGap(fieldsConfigTablet.gap);
      setNrOfFields(fieldsConfigTablet.nrOfFields);

    } else {
      setSize(fieldConfigMobile.size);
      setBigFieldSizeFactor(fieldConfigMobile.bigFieldSizeFactor);
      setFieldColor(fieldConfigMobile.fieldColor);
      setCols(fieldsConfigMobile.cols);
      setGap(fieldsConfigMobile.gap);
      setNrOfFields(fieldsConfigMobile.nrOfFields);
    }

    if (viewWidth > 768) {
      setBigFieldsLayout(bigFields);
      setSmallFieldsLayout(smallFields);
      setHiddenFieldsLayout(hiddenFields);

    } else if (viewWidth > 480) {
      setBigFieldsLayout(bigFieldsTablet);
      setSmallFieldsLayout(smallFieldsTablet);
      setHiddenFieldsLayout(hiddenFieldsTablet);

    } else {
      setBigFieldsLayout(bigFieldsMobile);
      setSmallFieldsLayout(smallFieldsMobile);
      setHiddenFieldsLayout(hiddenFieldsMobile);
    }
  }, [viewWidth]);

  // The given indeses in the skipList will be skipped from rendering
  // const skipList: number[] = [];
  const [skipList, setSkipList] = useState<number[]>([]);

  // If bigFields includes the activeField as its index, return it
  const getNameOfActiveField = (activeField: number | null) => {

    const bigFieldsObj =
      viewWidth > 768 ? bigFields :
        viewWidth > 480 ? bigFieldsTablet :
          bigFieldsMobile;

    const smallFieldsObj =
      viewWidth > 768 ? smallFields :
        viewWidth > 480 ? smallFieldsTablet :
          smallFieldsMobile;

    let item;
    item = bigFieldsObj.find(item => item.index === activeField);
    if (!item) item = smallFieldsObj.find(item => item.index === activeField);
    return item ? item.name : '';
  }

  // Skip items, that are covered by the bigFields:
  // on the right sode:           n + 1,
  // below:                       n + cols,
  // below and one to the right:  n + cols + 1,
  bigFieldsLayout.forEach(item => {
    skipList.push(item.index + 1, item.index + cols, item.index + cols + 1);
  });

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setSkipList([]);
    if (viewWidth > 768) {
      const list: number[] = [];
      bigFields.forEach(item => {
        list.push(item.index + 1, item.index + cols, item.index + cols + 1);
        setSkipList(list);
      });
    } else if (viewWidth > 480) {
      const list: number[] = [];
      bigFieldsTablet.forEach(item => {
        list.push(item.index + 1, item.index + cols, item.index + cols + 1);
        setSkipList(list);
      });
    } else {
      const list: number[] = [];
      bigFieldsMobile.forEach(item => {
        list.push(item.index + 1, item.index + cols, item.index + cols + 1);
        setSkipList(list);
      }
      );
    }

  }, [viewWidth]);

  // Create an array with the given number of fields
  const fieldArray = [...Array(nrOfFields)].map((_, i) => i).filter(id => !skipList.includes(id));

  return (
    <>
      <div className="container mx-auto">
        <div className="lg:pt-16" id="stack">
          <Title text="Stack" level={3} />
          <div className={`relative max-w-[1020px] mx-auto stacks-transform`}>
            <div className="relative">
                <div className={`grid lg:col-span-6 col-span-8 max-w-[770px] mx-auto`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: `${gap}px` }}>
                  <Fields
                    fieldArray={fieldArray}
                    bigFields={bigFieldsLayout}
                    smallFields={smallFieldsLayout}
                    downButton={downButton}
                    hiddenFields={hiddenFieldsLayout}
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