import React from 'react';
import profil_img from '../assets/profile2.jpg';

const Hero = () => {
  return (
    <div className="lg:translate-y-[60px]">
      <div className="hero-content lg:flex-col flex-row-reverse mb-[30px]">
        <img src={profil_img} className="max-w-[270px] h-[220px] w-[265px] ml-8 rounded-xl shadow-md" />
        <div className="text-right lg:text-left">
          <h1 className="text-xl font-bold translate-y-1">Gábor Juhász</h1>
          <p className="pt-2 text-md translate-y-0">Junior React-Frontend Entwickler</p>
          <a className="btn bg-transparent hover:bg-[#009f81] text-[#000] hover:text-[#fff] mt-7">Kontakt</a>

        </div>
      </div>
    </div>
  );
};

export default Hero;