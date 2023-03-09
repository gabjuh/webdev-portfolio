import { IContent } from './Tree';

export interface IText {
  textColor: string;
  content: IContent;
  y: number;
  horisontalPosition?: number;
  i?: number;
}