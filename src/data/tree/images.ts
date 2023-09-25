import boy from '../../assets/images/baby-sculptur-boy.png';
import girl from '../../assets/images/baby-sculptur-girl.png';
import wedding from '../../assets/images/wedding5.png';
import drive from '../../assets/images/auto_driving.png';
import baby from '../../assets/images/baby3.png';
import transilvano from '../../assets/images/prisma_il_transilvano.jpg';
import inline from '../../assets/images/inline_preview_2.png';
import musikerPortfolio from '../../assets/images/musiker_portfolio_2.png';
import inDialogo from '../../assets/images/in_dialogo_2.png';
import memory from '../../assets/images/memory_2.png';
import puzzle from '../../assets/images/puzzle_2.png';
import stablegram from '../../assets/images/stablegram_2.png';
import masterLogic from '../../assets/images/master_logic.png';
import tommyChords from '../../assets/images/tommyChords2.png';
import portfolio1 from '../../assets/images/portfolio_1.png';
import portfolio2 from '../../assets/images/portfolio_2.png';
import agbm from '../../assets/images/agbm.png';
import hatRendben from '../../assets/images/hat_rendben.png';
import sheetCms1 from '../../assets/images/musiker_portfolio_extel_react.png';
import sheetCms2 from '../../assets/images/musiker_database_sheet.png';

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
  {
    "name": "master_logic",
    "img": masterLogic,
    "credits": "Master Logic Game (React)"
  },
  {
    "name": "tommy_chords",
    "img": tommyChords,
    "credits": "TommyChords (React)"
  },
  {
    "name": "portfolio_1",
    "img": portfolio1,
    "credits": "Portfolio 1"
  },
  {
    "name": "agbm",
    "img": agbm,
    "credits": "Adventgemeinde Bremen-Mitte"
  },
  {
    "name": "portfolio_2",
    "img": portfolio2,
    "credits": "Portfolio v.2"
  },
  {
    "name": "hat_rendben",
    "img": hatRendben,
    "credits": "Hát Rendben"
  },
  {
    "name": "sheet_cms_1",
    "img": sheetCms1,
    "credits": "Sheet CMS 1"
  },
  {
    "name": "sheet_cms_2",
    "img": sheetCms2,
    "credits": "Sheet CMS 2"
  }
];

export default images;