import React, { useEffect, useState } from 'react';

const ScrollProgressBar = () => {

  const [scrollPercentage, setScrollPercentage] = useState<number>(0);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const percentage = (scrollTop / scrollHeight) * 100;
    setScrollPercentage(percentage);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#3332] fixed top-0 left-0 h-[5px] w-[100%] backdrop-filter backdrop-blur-md z-100">
      <div
        className="fixed top-0 left-0 h-[5px] bg-[#2ea18cdd]"
        style={{ width: `${scrollPercentage}%` }}
      ></div>
    </div>
  );
};

export default ScrollProgressBar;