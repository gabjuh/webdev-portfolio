export interface IGeneral {
  height: number;
  width: number;
  horisontalPosition: number;
  size: number;
  strokeWidth: number;
  bgColor: string;
  step: number;
  levelDistanceReduction: number;
}

export interface ITimeline {
  height: number;
  color: string;
}

export interface IPoint {
  pointSize: number;
  pointStrokeWidth: number;
}

export interface IContent {
  slug: string;
  name: string;
  typeOfActivity: string;
  categories: string[] | string;
  institute?: string;
  tech?: string[];
  year: number;
  showYear: boolean;
  description?: string;
  certificate?: string;
  recommendation?: string;
  img?: string;
  link?: string;
  end?: number;
  hidden?: boolean;
  isMajor?: boolean;
}

export interface INewBranchOn {
  start: number;
  end?: number;
}

export interface ILayout {
  level: number;
  startingLevel: number;
  branch: string;
  side: string;
  open?: string;
  newBranchOn?: INewBranchOn;
  end?: number;
  canceled?: boolean;
}

export interface IItem {
  content: IContent;
  layout?: ILayout;
}

export interface ITree {
  general: IGeneral;
  timeline: ITimeline;
  point: IPoint;
  items: IItem[];
}