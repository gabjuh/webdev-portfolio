import React from 'react';
import profil_img from '../assets/profile2.jpg';

const Hero = () => {
  return (
    <div className="absolute left-[775px] -top-[1rem]">
      <div className="hero-content flex-col">
        <img src={profil_img} className="max-w-[270px] h-[220px] w-[253px] rounded-xl shadow-md z-0" />
        <div>
          <h1 className="text-xl font-bold translate-y-1">Gábor Juhász</h1>
          <p className="pt-2 text-md translate-y-0">Junior React-Frontend Entwickler</p>
          <a className="btn bg-transparent text-[#444] hover:text-white hover:bg-[#6dbc44] mt-7">Kontakt</a>

        </div>
      </div>
    </div>
  );
};

export default Hero;