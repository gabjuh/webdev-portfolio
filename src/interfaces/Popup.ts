import { IContent, ILayout } from './Tree';

export default interface IPopup {
  color: string;
  content: IContent;
  timelineHorisontalPosition: number;
  titleHorisontalPosition: number;
  verticalPosition: number;
  showPopup?: string;
  setShowPopup: any;
  layout?: ILayout;
  selectedPopupSlug: string;
  handleOnClickPopup: any;
  viewWidth: number;
  nextPopup?: any;
  prevPopup?: any;
  index: number;
  arrLength: number;
  image?: { name: string; img: string; credits: string; };
}