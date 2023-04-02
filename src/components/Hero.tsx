import React from 'react';
import profil_img from '../assets/profile2.jpg';
import downArrow from '../assets/logos/down-arrow.svg';

interface IHero {
  scrollToId: (id: string) => void;
}

const Hero: React.FC<IHero> = ({ scrollToId }) => {
  return (
    <div className="lg:col-span-2 col-span-8 lg:order-1 -order-1">
      <div className="relative lg:translate-y-[136px] h-[95vh] md:h-[100%]">
        <div className="hero-content flex-col md:flex-row-reverse lg:flex-col">
          <img src={profil_img} className="max-w-[270px] h-[228px] lg:ml-8 rounded-xl shadow-md brightness-[1.2]" />
          <div className="text-center md:text-right lg:text-left">
            <h1 className="text-xl font-bold translate-y-1">Gábor Juhász</h1>
            <p className="pt-2 text-md translate-y-0">Junior React-Frontend Entwickler</p>
            <a href="mailto:adgbe@yahoo.de" className="btn btn-sm bg-transparent hover:bg-[#2db6a1] text-[#000] text-xs px-5 hover:text-[#fff] mt-7 shadow-md border-[.5px]">Kontakt</a>
          </div>
        </div>
        <div className="visible md:invisible block absolute bottom-5 w-[100%] text-center">
          <button
            className="py-2 px-2 rounded-3xl shadow-md bg-[#28cbb7] transition-all duration-[150] hover:text-[#fff] hover:-translate-y-[.3rem] animate-bounce w-8"
            onMouseUp={() => scrollToId('cv')}
          >
            <img src={downArrow} alt="arrow" />
          </button>
        </div>
      </div>
    </div>

  );
};

export default Hero;