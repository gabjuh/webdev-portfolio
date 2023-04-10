export interface IField {
  name: string;
  img: string;
  size: number[];
  isBig: boolean;
  pos: number[];
  i: number;
  showIndexes: boolean;
  cols: number;
  activeField: number | null;
  setActiveField: (i: number | null) => void;
  nrOfFields: number;
  fn?: {
    scrollToId: (id: string) => void;
    id: string;
  } | null;
  isLicensed?: boolean;
}