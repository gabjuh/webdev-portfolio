import boy from '../../assets/baby-sculptur-boy.png';
import girl from '../../assets/baby-sculptur-girl.png';

interface IImages {
  name: string;
  img: string;
}

const images: IImages[] = [
  {
    "name": "boy",
    "img": boy
  },
  {
    "name": "girl",
    "img": girl
  }
];

export default images;