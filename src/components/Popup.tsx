import React, { useState, useEffect } from 'react';
import { isSafari } from 'react-device-detect';
import pdfs from '../data/pdfs/pdfs';
import IPopup from '../interfaces/Popup';
import closeIcon from '../assets/logos/close-x.svg';
import upArrow from '../assets/logos/up-arrow.svg';
import downArrow from '../assets/logos/down-arrow.svg';

const Popup: React.FC<IPopup> = ({
  color,
  content,
  timelineHorisontalPosition,
  titleHorisontalPosition,
  verticalPosition,
  showPopup,
  setShowPopup,
  layout,
  selectedPopupSlug,
  handleOnClickPopup,
  viewWidth,
  nextPopup,
  prevPopup,
  index,
  arrLength,
  image,
  side,
  pos,
  level,
  branchWidth
}) => {

  const contentId: string = `content_${content.slug}`;
  const contentMinHeight: number = 120;
  const [contentHeight, setContentHeight] = useState<number>(contentMinHeight);
  const marginBottom: number = isSafari ? 16 : 40;
  const showCategories: boolean = true;

  const [popupWidth, setPopupWidth] = useState<number>(400);

  useEffect(() => {
    if (viewWidth > 470) {
      setPopupWidth(400);
    } else if (viewWidth > 360) {
      setPopupWidth(360);
    }
  }, [viewWidth]);

  const x = viewWidth < 480 ? (viewWidth - popupWidth) / 2 : timelineHorisontalPosition;
  const y = verticalPosition;

  interface IPdf {
    id: string;
    name: string;
    url: string;
  }

  const [certificate, setCertificate] = useState<IPdf | undefined>(undefined);
  const [recommendations, setRecommendations] = useState<IPdf[]>([]);

  const getCertificate = (certificateName: string | undefined) => {
    if (certificateName) {
      const certificateObj = pdfs.find(pdf => pdf.id === certificateName);
      certificateObj && setCertificate(certificateObj);
    }
  };

  const getRecommendations = (recommendations: Array<string>) => {
    if (recommendations) {
      const recommendationsObj = pdfs.filter(pdf => recommendations.includes(pdf.id));
      setRecommendations(recommendationsObj);
    }
  };

  useEffect(() => {
    getCertificate(content.certificate);
    content.recommendations && getRecommendations(content.recommendations);
  }, []);

  const isCertificateUrl = certificate?.url !== '' || certificate?.url === undefined;
  const isRecommendationUrl = recommendations.length > 0;

  const Button = (label: string, pdfObj: IPdf | undefined, isUrl: boolean) =>
    <div className={`tooltip tooltip-right mt-2 ${!isUrl ? 'tooltip-warning ' : ''}`} data-tip={isUrl ? pdfObj ? pdfObj.name : '' : 'File nicht vorhanden.'}>
      <div className="translate-y-[0.5px]">
        <a className={`btn btn-xs px-3 py-1 rounded-sm bg-blue-500 hover:bg-blue-600 text-white border-none ${!isUrl ? 'btn-disabled !bg-[#bbb]' : ''}`} style={{ backgroundColor: `${color}` }} href={pdfObj?.url} download>{label}</a>
      </div>
    </div>;

  const Categories = () =>
    <p className="text-xs opacity-70 mb-1" style={{ color: color }}>
      {Array.isArray(content.categories) ? content.categories.map((category: string, index: number, array: Array<string>) => `${category.toUpperCase()}${index !== array.length - 1 ? ' | ' : ''}`).join('') : ''}
    </p>;

  const Link = (label: string, url: string) =>
    <div className="my-4">
      <a className="py-1 text-xs" style={{ color: `${color}` }} href={url} target="_blank" rel="noreferrer">{label}</a>
    </div>


  const getContentHeight = (): number => {
    const contentElement = document.querySelector(`#${contentId}`);
    return contentElement instanceof HTMLElement ? contentElement.offsetHeight : 0;
  }

  useEffect(() => {
    const contentHeight = getContentHeight();
    if (contentHeight < 100) {
      setContentHeight(contentMinHeight);
    } else {
      setContentHeight(contentHeight + marginBottom);
    };
  });

  const isArrowUpClickable = () => !(index <= 1);

  const isArrowDownClickable = () => !(arrLength <= index + 1);

  const handleOnClickArrowUp = () => isArrowUpClickable() && prevPopup();

  const handleOnClickArrowDown = () => isArrowDownClickable() && nextPopup();

  return (
    <>
      <g
        className={`${showPopup !== content.slug ? 'invisible opacity-0' : ''} transition-all duration-[.2s] relative block drop-shadow-lg`}
      >
        {/* popup frame */}
        <rect
          fill="#fff"
          stroke={color}
          strokeWidth="1.5"
          x={x}
          y={y}
          // width={viewWidth > 470 ? 400 : 360}
          width={popupWidth}
          height={contentHeight}
          rx="8" ry="8"
        />

        {/* Close button */}
        <image
          className="cursor-pointer"
          href={closeIcon}
          height="26"
          width="26"
          x={x + (viewWidth > 470 ? 364 : 319)} y={y + 15} fontSize="21" fill="#444"
          onClick={handleOnClickPopup}
        />

        {/* Up arrow to previous popup */}
        <image
          className={`${isArrowUpClickable() ? 'cursor-pointer' : 'opacity-30'}`}
          href={upArrow}
          height="24"
          width="24"
          x={x + (viewWidth > 470 ? 364 : 320)}
          y={y + 55}
          onClick={handleOnClickArrowUp}
        />

        {/* Down arrow to next popup */}
        <image
          className={`${isArrowDownClickable() ? 'cursor-pointer' : 'opacity-30'}`}
          href={downArrow}
          height="24"
          width="24"
          x={x + (viewWidth > 470 ? 364 : 320)}
          y={y + 82}
          onClick={handleOnClickArrowDown}
        />

        {/* Content */}
        <foreignObject
          className="overflow-hidden relative"
          x={x + 25} y={y + 12}
          fontSize="15" fill="#444"
          width={viewWidth > 470 ? 330 : 290}
          height={contentHeight}
        >
          <div id={contentId} className="" >
            {/* Name */}
            <p
              className={`relative  font-[500] z-10 mb-[0px] ${isSafari ? 'pt-[25px] text-[11.05pt]' : 'mt-[0px] text-[11.87pt]'} -translate-x-[1px] cursor-pointer`}
              onClick={handleOnClickPopup}
            >{content.name}</p>

            <div className={`${isSafari ? 'translate-y-0.5' : ''}`}>
              {/* Place */}
              <p className="text-md font-[600]">{content.institute}</p>

              {/* Type of Taetigkeit */}
              <p className="text-sm italic">{content.typeOfActivity}</p>

              {/* Year-year */}
              <p className="font-[300] my-1 text-xs">{`${''}${content.year}${content.end && content.year !== content.end ? ` - ${content.end}` : ''}`}</p>
            </div>

            {/* Categories */}
            <div className={isSafari ? 'mt-3' : 'mt-2'}>
              {showCategories && <Categories />}
            </div>

            {/* Image */}
            {image &&
              <>
              <div className="relative w-[100%] mx-auto mt-6">
                  <img
                  className="max-h-[200px] object-cover rounded-md drop-shadow-sm mx-auto"
                  src={image.img}
                  alt={image.img}
                />
                <div
                  className="text-[8pt] whitespace-nowrap text-center mt-2"
                >
                  {image.credits}
                </div>
              </div>
            </>
            }

            {/* Description */}
            {content.description && content.description.split('|').map((item, index) => <p key={index} className="my-4 opacity-70">{item}</p>)}

            {/* Link */}
            <div className={`${isSafari ? 'translate-y-0' : ''}`}>
              {content.link && Link('Mehr...', content.link)}
            </div>

            {/* Tech */}
            <div className={`${isSafari ? 'translate-y-0' : ''} mb-1`}>
              <>
                {content.tech?.map((tech: string, i: number, a: string[]) =>
                  <React.Fragment key={`tech_${tech}_${i}`}>
                    <p className="whitespace-normal inline-block">
                      <span
                        key={`${content.slug}_tech_${i}`}
                        className="text-[#eee] text-[.65rem] bg-[#444] mr-1 px-2 pt-[.8px] pb-[2px] rounded-md whitespace-nowrap"
                      >
                    {tech}
                    </span>
                    </p>
                  </React.Fragment>
                )
                }
              </>
            </div>

            {/* Certificate */}
            {content.certificate && (
              Button('Zertifikat', certificate, isCertificateUrl)
            )}

            {/* Recommendation */}
            {recommendations.length > 0 && (
              recommendations.map((recommendation: IPdf, i: number) => {
                return (
                  <div key={`recommendations_${content.slug}_${i}`}>
                    {Button(`Empfehlung`, recommendation, isRecommendationUrl)}
                  </div>
                );
              })
            )}
          </div>
        </foreignObject>
      </g>
    </>
  );
};

export default Popup;