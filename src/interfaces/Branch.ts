interface IBranch {
  height: number | null,
  step: number,
  size: number,
  side: string,
  color?: string,
  bgColor: string,
  strokeWidth: number,
  pos: number[],
  level: number;
  heightTillTop: number | null;
  levelDistanceReduction: number;
  open?: string;
  openBranchIndexes?: number[];
  newBranchOn?: {
    start: number;
    end?: number;
  };
  pointStrokeWidth: number;
  pointSize: number;
  end?: number;
  canceled?: boolean;
}

export default IBranch;