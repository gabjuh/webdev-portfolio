import { IText, IYear } from '../interfaces/Text';

const Year: React.FC<IYear> = ({
  textColor,
  content,
  y,
  i,
  yearPos
}) => {

  const showIndex: boolean = false
  
  return (
    <text x={yearPos} y={y} fill={content.hidden ? '#777' : textColor}>{showIndex && i + ' '}{content.showYear && content.year}</text>
  );
};

const Text: React.FC<IText> = ({
  textColor,
  content,
  y,
  timelineHorisontalPosition,
  onClick,
  isPopupText
}) => {

  const handleMouseEnter = (e: React.MouseEvent<SVGTextElement, MouseEvent>) => {
    e.currentTarget.setAttribute('fill', '#333');
  };

  const handleMouseLeave = (e: React.MouseEvent<SVGTextElement, MouseEvent>) => {
    const el = e.currentTarget;
    setTimeout(() => {
      el.setAttribute('fill', content.hidden ? '#777' : textColor);
    }, 800);
  };

  return (
    <g>

      {/* Name */}
      <text
        id={content.slug}
        className={`hidden sm:block transition duration-[400ms] ease-in-out ${`drop-shadow-[0_0_2px_rgba(235,235,235,1)] cursor-pointer`} ${isPopupText ? 'sm:-translate-y-[55px] md:translate-y-0' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        fill={content.hidden ? '#777' : textColor}
        x={timelineHorisontalPosition && timelineHorisontalPosition + 190}
        y={y}
      >
        <tspan fontWeight="450">{content.name}</tspan>
        {/* ico */}

      </text>
    </g>
  );
};

export { Year, Text };

