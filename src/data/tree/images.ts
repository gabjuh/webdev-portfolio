import boy from '../../assets/baby-sculptur-boy.png';
import girl from '../../assets/baby-sculptur-girl.png';
import wedding from '../../assets/wedding5.png';
import drive from '../../assets/auto_driving.png';
import baby from '../../assets/baby3.png';
import transilvano from '../../assets/prisma_il_transilvano.jpg'
import inline from '../../assets/inline_preview_2.png';
import musikerPortfolio from '../../assets/musiker_portfolio_2.png';
import inDialogo from '../../assets/in_dialogo.png';
import memory from '../../assets/memory_2.jpg';
import puzzle from '../../assets/puzzle.png';
import stablegram from '../../assets/stablegram.png';

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