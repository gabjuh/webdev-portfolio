import boy from '../../assets/images/baby-sculptur-boy.png';
import girl from '../../assets/images/baby-sculptur-girl.png';
import wedding from '../../assets/images/wedding5.png';
import drive from '../../assets/images/auto_driving.png';
import baby from '../../assets/images/baby3.png';
import transilvano from '../../assets/images/prisma_il_transilvano.jpg';
import inline from '../../assets/images/inline_preview_2.png';
import musikerPortfolio from '../../assets/images/musiker_portfolio_2.png';
import inDialogo from '../../assets/images/in_dialogo.png';
import memory from '../../assets/images/memory_2.jpg';
import puzzle from '../../assets/images/puzzle_2.png';
import stablegram from '../../assets/images/stablegram.png';

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
  },
  {
    "name": "inline_preview",
    "img": inline,
    "credits": ""
  },
  {
    "name": "musiker_portfolio",
    "img": musikerPortfolio,
    "credits": "Concierto Iberico©"
  },
  {
    "name": "in_dialogo",
    "img": inDialogo,
    "credits": "Concerto Foscari©"
  },
  {
    "name": "memory_2",
    "img": memory,
    "credits": "Projekt für darstellen Memories"
  },
  {
    "name": "puzzle",
    "img": puzzle,
    "credits": "Schiebepuzzle (React)"
  },
  {
    "name": "stablegram",
    "img": stablegram,
    "credits": "Stablegram (Basic Instagram clone with Laravel)"
  },
];

export default images;