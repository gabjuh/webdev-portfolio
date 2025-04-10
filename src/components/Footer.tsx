import React from 'react';
import { Link } from 'react-router-dom';

import facebook from '../assets/logos/facebook_mc.svg';
import github from '../assets/logos/github_mc.svg';
import linkedIn from '../assets/logos/linkedin_mc.svg';
import stackOverflow from '../assets/logos/stack_overflow_mc.svg';
import cv from '../assets/pdfs/GaborJuhasz_CV_22.09.2023.pdf';

const Footer = () => {
  return (
    <footer className="p-10 bg-[#ddd] w-[100%]">
      <p className="text-center">
        <a href={cv} className="text-[#7a7] hover:text-[#777] transition-all duration-200" target="_blank">CV</a> | <a href="mailto:info@gaborjuhasz.de" className="text-[#7a7] hover:text-[#777] transition-all duration-200">Kontakt</a> | <Link to="/credits" className="text-[#7a7] hover:text-[#777] transition-all duration-200">Credits</Link> | <Link to="/impressum" className="text-[#7a7] hover:text-[#777] transition-all duration-200">Impressum</Link>
      </p>
      <div className="flex justify-center">
        <a className="w-[45px] p-3" href="https://www.linkedin.com/in/g%C3%A1bor-juh%C3%A1sz-5352935a/" target="_blank">
          {/* LinkedIn */}
          <img src={linkedIn} alt="Linkedin Icon" />
        </a>
        <a className="w-[45px] p-3" href="https://github.com/gabjuh/webdev-portfolio" target="_blank">
          {/* Github */}
          <img src={github} alt="Github Icon" />
        </a>
        <a className="w-[47px] p-3" href="https://stackoverflow.com/users/10944631/gabesz-juh%c3%a1sz" target="_blank">
          {/* Stack Overflow */}
          <img src={stackOverflow} alt="Stack Overflow Icon" />
        </a>
        <a className="w-[49px] p-3" href="https://www.facebook.com/gabor.juhasz.14473426" target="_blank">
          {/* Facebook */}
          <img src={facebook} alt="Facebook Icon" />
        </a>
      </div>
      <p className="text-center w-[100%] text-sm">Ⓒ Gábor Juhász</p>
      <p className="text-center w-[100%] text-sm text-[#999]">Stand: 3. April 2025</p>
    </footer>
  );
};

export default Footer;