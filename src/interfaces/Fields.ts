export interface IFields {
  fieldArray: number[];
  bigFields: { index: number; name: string; img: string; }[];
  smallFields: { index: number; name: string; img: string; }[];
  downButton: { index: number; img: string; };
  hiddenFields: number[];
  size: number;
  bigFieldSize: number;
  fieldColor: string;
  showIndexes: boolean;
  cols: number;
  activeField: number | null;
  setActiveField: React.Dispatch<React.SetStateAction<number | null>>;
  nrOfFields: number;
  scrollToId: (id: string) => void;
}