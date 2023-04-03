import { IContent } from './Tree';

export interface IYear {
  textColor: string;
  content: IContent;
  y: number;
  i?: number;
  timelineHorisontalPosition: number;
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
  showPopup: {
    showPopup?: string;
    setShowPopup: any;
  };
}