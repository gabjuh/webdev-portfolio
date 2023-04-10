import { IFieldStyles } from '../interfaces/FieldStyles';

const useFieldStyles = (nrOfFields: number, cols: number, i: number, size: number[], pos: any) => {

  const increaseOpacity = (startOp: number, i: number) => startOp + i * 0.001;

  const setGradientBase = (colorValue: number, index: number): number => (255 - colorValue) / nrOfFields * index + colorValue;

  const generateFirstColor = (i: number, cols: number): string => {
    const [r, g, b, a] = [setGradientBase(25, i), setGradientBase(175, i), setGradientBase(117, i), increaseOpacity(0.3, i)];
    return `rgba(${r},${g},${b},${a})`;
  };

  const generateSecondColor = (i: number, cols: number): string => {
    const [r, g, b, a] = [setGradientBase(120, i), setGradientBase(192, i), setGradientBase(192, i), increaseOpacity(0.3, i)];
    return `rgba(${r},${g},${b},${a})`;
  };

  // Get the last digit of the number or return the number if it is smaller than 10
  const getLastDigit = (nr: number): number => nr % cols;

  // Get the first digit of the number or return 0 if it is smaller than 10
  const getFirstDigit = (nr: number): number => Math.floor(nr / cols);

  const increaseNrWithIndex = (nr: number, index: number, fineTuning: number = 1): number => (nr + index) * fineTuning;

  const stylesDefault: IFieldStyles = {
    width: `${size[0]}px`,
    height: `${size[1]}px`,
    left: `${pos[0]}px`,
    right: 0,
    background: `linear-gradient(120deg, ${generateFirstColor(i, cols)}, ${generateSecondColor(i, cols)})`,
    boxShadow: `${increaseNrWithIndex(-5, getLastDigit(i), .4)}px ${increaseNrWithIndex(-5, getFirstDigit(i), .3)}px 4px rgba(56,97,109,${increaseOpacity(0.45, i)})`,
    transitionDuration: "600ms",
  };

  const stylesOnHover: IFieldStyles = {
    width: `${size[0]}px`,
    height: `${size[1]}px`,
    left: `${pos[0]}px`,
    right: 0,
    background: `linear-gradient(120deg, ${generateFirstColor(i, cols)}, ${generateSecondColor(i, cols)})`,
    boxShadow: `${increaseNrWithIndex(-5, getLastDigit(i), 1.1)}px ${increaseNrWithIndex(-5, getFirstDigit(i), 1.1)}px 6px rgba(56,97,109,${increaseOpacity(0.45, i)})`,
    transform: `translateY(${-4}px) translateX(${-1}px)`,
    transitionDuration: "150ms",
  };

  const stylesOnClick: IFieldStyles = {
    width: `${size[0]}px`,
    height: `${size[1]}px`,
    left: `${pos[0]}px`,
    right: 0,
    background: `linear-gradient(120deg, ${generateFirstColor(i, cols)}, ${generateSecondColor(i, cols)})`,
    boxShadow: `${increaseNrWithIndex(-5, getLastDigit(i), .4)}px ${increaseNrWithIndex(-5, getFirstDigit(i), .4)}px 4px rgba(56,97,109,${increaseOpacity(0.45, i)})`,
    transform: `translateY(${2}px) translateX(${1}px)`,
    transitionDuration: "100ms",
  };

  return { stylesDefault, stylesOnHover, stylesOnClick, increaseOpacity };
};

export { useFieldStyles };
