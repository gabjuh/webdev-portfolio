import { IContent } from './Tree';

export interface IYear {
  textColor: string;
  content: IContent;
  y: number;
  i?: number;
  yearPos: number;
}

export interface IText {
  textColor: string;
  bgColor?: string;
  content: IContent;
  y: number;
  timelineHorisontalPosition?: number;
  i?: number;
  categoryColor: string;
  onClick: any;
  isPopupText?: boolean;
  hoveredElementSlugs: string[];
  setHoveredElementSlugs: any;
  selectedPopupSlug: string;
}