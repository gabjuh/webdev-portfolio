import React, { useState, useEffect } from 'react';
import { IContent } from '../interfaces/Tree';
import { Text } from './Text';

// // Icos
// import icoRings from '../assets/icos/icons8-eheringe-48.png';
// import icoGirl from '../assets/icos/icons8-rassel-24.png';
// import icoBoy from '../assets/icos/icons8-rassel-24b.png';

interface IPopup {
  color: string;
  content: IContent;
  horisontalPosition: number;
  verticalPosition: number;
  showPopup?: string;
  setShowPopup: any;
}

const Popup: React.FC<IPopup> = ({
  color,
  content,
  horisontalPosition,
  verticalPosition,
  showPopup,
  setShowPopup
}) => {

  const x: number = horisontalPosition && horisontalPosition + 115;
  const y: number = verticalPosition - 35;

  const contentId: string = `content_${content.slug}`;
  const [contentHeight, setContentHeight] = useState<number>(240);
  const showCategories: boolean = true;

  const Categories = () =>
    <p className="text-xs opacity-30 mb-1">
      {Array.isArray(content.categories) ? content.categories.map((category: string, index: number, array: Array<string>) => `${category.toUpperCase()}${index !== array.length - 1 ? ' | ' : ''}`).join('') : ''}
    </p>;

  const Button = (label: string, url: string) =>
    <div className="mt-4">
      <a className="btn btn-xs px-3 py-1 rounded-sm bg-blue-500 hover:bg-blue-600 text-white border-none" style={{ backgroundColor: `${color}` }} href={url} download>{label}</a>
    </div>

  const getContentHeight = (): number => {
    const contentElement = document.querySelector(`#${contentId}`);
    if (contentElement instanceof HTMLElement) {
      return contentElement.offsetHeight;
    }
    return 0;
  };

  useEffect(() => {
    setContentHeight(getContentHeight() + 70);
  }, []);

  return (
    <>
      <g
        className={`${showPopup !== content.slug && 'invisible opacity-0'} transition-all duration-[.5s] relative block drop-shadow-lg`}

      >
        {/* popup frame */}
        <rect
          fill="#feffff"
          stroke={color}
          strokeWidth="1.5"
          x={x}
          y={y}
          width="350"
          height={contentHeight}
          rx="8" ry="8"
        />

        {/* Title */}
        <Text
          content={content}
          textColor="#333"
          y={y + 35}
          horisontalPosition={horisontalPosition}
          categoryColor={color}
          onClick={() => setShowPopup()}
          showPopup={{ showPopup, setShowPopup }}

        />
        {/* <image x={x + 155} y={y + 10} href={icoBoy} height="18" width="18" /> */}

        {/* Close button */}
        <text
          className="cursor-pointer"
          x={x + 312} y={y + 35} fontSize="21" fill="#444"
          onClick={() => setShowPopup()}
        >
          &#x2715;
        </text>
        <foreignObject
          className="overflow-auto"
          x={x + 25} y={y + 50}
          fontSize="15" fill="#444"
          width="310"
          height={contentHeight}
        >
          <div id={contentId} className="" >
            {/* Place */}
            <p className="text-md font-[600]">{content.institute}</p>

            {/* Type of Taetigkeit */}
            <p className="text-sm italic">{content.typeOfActivity}</p>

            {/* Year-year */}
            <p className="font-[300] my-1 text-xs">{`${content.year}${content.end && content.year !== content.end ? ` - ${content.end}` : ''}`}</p>

            {/* Categories */}
            {showCategories && <Categories />}

            {/* Description */}
            {content.description && <p className="my-4 opacity-70">{content.description}</p>}

            {/* Tech */}
            <p className="-mt-1 mb-1">
              <>
                {content.tech?.map((tech: string, i: number, a: string[]) =>
                  <span
                    key={`${content.slug}_tech_${i}`}
                    className="text-[#eee] text-[.65rem] bg-[#444] mr-1 px-2 rounded-md"
                  >
                    {tech}
                  </span>)
                }
              </>
            </p>

            {/* Certificate */}
            {content.certificate && Button('Zertifikat', content.certificate)}

            {/* Recommendation */}
            {content.recommendation && Button('Empfehlungsbrief', content.recommendation)}

          </div>
        </foreignObject>

      </g>
    </>
  );
};

export default Popup;

