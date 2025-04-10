export interface IGeneral {
  height: number;
  width: number;
  horisontalPosition: number;
  size: number;
  strokeWidth: number;
  bgColor: string;
  step: number;
  levelDistanceReduction: number;
  textColor: string;
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
  recommendations?: string[];
  img?: string;
  link?: string;
  end?: number;
  hidden?: boolean;
  isMajor?: boolean;
  image?: string;
  image2?: string;
  icons?: string[];
  gameLink?: string;
  githubLink?: string;
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
  isEndLower?: boolean;
}

export interface IItem {
  content: IContent;
  layout?: ILayout;
  projects?: IProjectInTable[];
}

export interface ITree {
  general: IGeneral;
  timeline: ITimeline;
  point: IPoint;
  items: IItem[];
}

export interface IProjectInTable {
  name: string;
  stack: string[];
  url?: string;
}