import React, { useState, useEffect } from 'react';

const BusinessCard = () => {

  const [flip, setFlip] = useState<boolean>(false);


  return (
    <div
      className="flex relative justify-center"
      style={{
        // transform: `${flip ? 'rotateY(180deg)' : 'rotateY(0deg)'}}`,
      }}
    >
      <div
        className={`w-[600px] h-[350px] mx-auto my-10  rounded-[30px] shadow-[0_0_5px_2px_rgba(0,0,0,0.5)] transition-all duration-150 ${flip ? 'flip' : ''}`}
        onClick={() => setFlip(!flip)}
        style={{
          transform: `${flip ? 'rotateY(180deg)' : 'rotateY(0deg)'}}`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="front absolute"
          style={{
            backfaceVisibility: 'hidden',
            transform: `${flip ? 'rotateY(180deg)' : 'rotateY(0deg)'}`
          }}
        >
          FRONT
        </div>
        <div
          className="back absolute"
          style={{
            backfaceVisibility: 'hidden',
            transform: `${!flip ? 'rotateY(180deg)' : 'rotateY(0deg)'}`
          }}
        >
          BACK
        </div>
        {/* {!flip ? 'front' : 'back'} */}
      </div>
    </div>
  );
};

export default BusinessCard;