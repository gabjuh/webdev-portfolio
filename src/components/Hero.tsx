import React, { useEffect, useState } from 'react';
import profil_img from '../assets/images/profile2.png';
import profil_xmas_img from '../assets/images/profile2_xmas_b.png';

interface IHero {
}

const Hero: React.FC<IHero> = ({ }) => {

  const [data, setData] = useState([]);
  const [codeWarsPoints, setCodeWarsPoints] = useState(0);
  const [stackOverflowPoints, setStackOverflowPoints] = useState(0);

  // Check if date is between 1st of December and 25th of January
  const isChristmasTime = () => {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    return (month === 11 && day >= 1) || (month === 0 && day <= 25);
  }

  // Fetch data from CodeWars API
  const fetchCodeWars = async () => {
    const res = await fetch('https://www.codewars.com/api/v1/users/gabjuh');
    const data = await res.json();
    setData(data);
    await setCodeWarsPoints(data.honor);
  }

  // Fetch stackoverflow data
  const fetchStackOverflow = async () => {
    const res = await fetch('https://api.stackexchange.com/2.3/users/10944631/reputation?site=stackoverflow');
    const data = await res.json();
    setStackOverflowPoints(data.items[0].reputation_change + data.items[1].reputation_change); // upvotes - downvotes
  }

  useEffect(() => {
    fetchCodeWars();
    fetchStackOverflow();
    // setCodeWarsPoints();
  }, []);

  return (
    <div className="mb-[200px] pt-5" id="profile">
      <div className="relative h-[100%]">
        <div className="hero-content flex-col mx-auto">
          <img src={isChristmasTime() ? profil_xmas_img : profil_img} className="rounded-xl shadow-md brightness-[1.2]" />
          <div className="text-center">
            <h1 className="text-2xl font-bold translate-y-1 mt-10">Gábor Juhász</h1>
            <p className="pt-2 text-lg my-2 translate-y-0">Junior React-Frontend Entwickler</p>
            <div className="-mt-3">
              <a
                href="mailto:info@gaborjuhasz.de"
                className="btn btn-sm bg-[#c6ded8] hover:bg-[#eee] text-[#222] border-none text-xs px-3 hover:text-[#333] mt-7 shadow-md border-[.5px] mr-3"
              >Email</a>

              <a
                href="https://github.com/gabjuh"
                target="_blank"
                className="btn btn-sm bg-[#c6ded8] hover:bg-[#eee] text-[#222] border-none text-xs px-3 hover:text-[#333] mt-7 shadow-md border-[.5px] mr-3"
              >Github</a>

              <a
                href="https://www.codewars.com/users/gabjuh"
                target="_blank"
                className="btn btn-sm bg-[#c6ded8] hover:bg-[#eee] text-[#222] border-none text-xs px-3 hover:text-[#333] mt-7 shadow-md border-[.5px] mr-3"
              >CodeWars ({codeWarsPoints})</a>

              <a
                href="https://stackoverflow.com/users/10944631/gabesz-juh%c3%a1sz"
                target="_blank"
                className="btn btn-sm bg-[#c6ded8] hover:bg-[#eee] text-[#222] border-none text-xs px-3 hover:text-[#333] mt-7 shadow-md border-[.5px] mr-3"
              >StackOverflow ({stackOverflowPoints})</a>

              <a
                href="https://www.linkedin.com/in/g%C3%A1bor-juh%C3%A1sz-5352935a/"
                target="_blank"
                className="btn btn-sm bg-[#c6ded8] hover:bg-[#eee] text-[#222] border-none text-xs px-3 hover:text-[#333] mt-7 shadow-md border-[.5px]"
              >LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Hero;