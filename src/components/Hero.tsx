import React from 'react';
import profil_img from '../assets/images/profile2.png';
import downArrow from '../assets/logos/down-arrow.svg';

interface IHero {
}

const Hero: React.FC<IHero> = ({ }) => {
  return (
    <div className="mb-[200px] pt-5" id="profile">
      <div className="relative h-[100%]">
        <div className="hero-content flex-col mx-auto">
          <img src={profil_img} className="rounded-xl shadow-md brightness-[1.2]" />
          <div className="text-center">
            <h1 className="text-2xl font-bold translate-y-1 mt-10">Gábor Juhász</h1>
            <p className="pt-2 text-lg my-2 translate-y-0">Junior React-Frontend Entwickler</p>
            <div className="-mt-3">
              <a
                href="mailto:info@gaborjuhasz.de"
                className="btn btn-sm bg-[#c6ded8] hover:bg-[#eee] text-[#222] border-none text-xs px-3 hover:text-[#333] mt-7 shadow-md border-[.5px]"
              >Email</a>

              <a
                href="https://github.com/gabjuh"
                target="_blank"
                className="btn btn-sm bg-[#c6ded8] hover:bg-[#eee] text-[#222] border-none text-xs px-3 hover:text-[#333] mt-7 shadow-md border-[.5px] mx-3"
              >Github</a>

              <a
                href="https://www.linkedin.com/in/g%C3%A1bor-juh%C3%A1sz-5352935a/"
                target="_blank"
                className="btn btn-sm bg-[#c6ded8] hover:bg-[#eee] text-[#222] border-none text-xs px-3 hover:text-[#333] mt-7 shadow-md border-[.5px]"
              >LinkedIn</a>
            </div>
          </div>
        </div>
        {/* <div className="visible lg:invisible block absolute bottom-[10%] w-[100%] text-center">
          <button
            className="py-2 px-2 rounded-3xl shadow-md bg-[#28cbb7] transition-all duration-[150] hover:text-[#fff] hover:-translate-y-[.3rem] animate-bounce w-8"
            onMouseUp={() => scrollToId('cv')}
          >
            <img src={downArrow} alt="arrow" />
          </button>
        </div> */}
      </div>
    </div>

  );
};

export default Hero;