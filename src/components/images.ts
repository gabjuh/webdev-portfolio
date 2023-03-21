import tommysChordsImg from '../assets/tommyschords.png';
import puzzleImg from '../assets/puzzle.png';

type ImagesMap = {
  [key in string]: string;
};

export const images: ImagesMap = {
  'tommyschords': tommysChordsImg,
  'puzzle': puzzleImg,
};