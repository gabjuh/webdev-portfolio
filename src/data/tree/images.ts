import boy from '../../assets/baby-sculptur-boy.png';
import girl from '../../assets/baby-sculptur-girl.png';
import wedding from '../../assets/wedding5.png';
import drive from '../../assets/auto_driving.png';
import baby from '../../assets/baby3.png';
import transilvano from '../../assets/prisma_il_transilvano.jpg'

interface IImages {
  name: string;
  img: string;
  credits: string;
}

const images: IImages[] = [
  {
    "name": "boy",
    "img": boy,
    "credits": "AI Art Generator - Hotpot©"
  },
  {
    "name": "girl",
    "img": girl,
    "credits": "AI Art Generator - Hotpot©"
  },
  {
    "name": "wedding",
    "img": wedding,
    "credits": "AI Art Generator - Hotpot©"
  },
  {
    "name": "drive",
    "img": drive,
    "credits": "AI Art Generator - Gábor Juhász©"
  },
  {
    "name": "prisma",
    "img": transilvano,
    "credits": "Sendesaal Bremen©"
  },
  {
    "name": "baby",
    "img": baby,
    "credits": "AI Art Generator - Hotpot©"
  }
];

export default images;