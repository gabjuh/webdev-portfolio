import boy from '../../assets/baby-sculptur-boy.png';
import girl from '../../assets/baby-sculptur-girl.png';
import wedding from '../../assets/wedding5.png';
import drive from '../../assets/drive.png';
import baby from '../../assets/baby3.png';

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
  },
  {
    "name": "wedding",
    "img": wedding
  },
  {
    "name": "drive",
    "img": drive
  },
  {
    "name": "baby",
    "img": baby
  }
];

export default images;