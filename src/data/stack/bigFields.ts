import reactLogo from '../../assets/logos/react_mc.svg';
import typescriptLogo from '../../assets/logos/typescript_mc.svg';
import tailwindLogo from '../../assets/logos/tailwind_mc.svg';

interface IBigField {
  index: number;
  name: string;
  img: string;
}

const bigFields: IBigField[] = [
  {
    "index": 36,
    "name": "React",
    "img": reactLogo
  },
  {
    "index": 44,
    "name": 'TypeScript',
    "img": typescriptLogo
  },
  {
    "index": 56,
    "name": "Tailwind CSS",
    "img": tailwindLogo
  }
];

export default bigFields;