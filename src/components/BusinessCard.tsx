import React, { useState, useEffect } from 'react';
import visitcardA from '../assets/images/visitenkarte.png';
import visitcardB from '../assets/images/visitenkarte2.png';

const BusinessCard = () => {

  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsCardHovered(true);
  };

  const handleMouseLeave = () => {
    setIsCardHovered(false);
  }

  return (
    <div 
      className={`h-[300px] `}
    >
      <div 
      // className={`w-[430px] h-[300px] mx-auto p-32 ease-in-out transiton-all duration-[300ms] ${!isCardHovered ? 'stacks-transform border border-red-500' : ''}`}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      >
        <div
          className={`flip-card mx-auto -rotate-[28deg] w-[256px] h-[167.5px] hover:w-[502px] hover:h-[325px] ease-in-out hover:rotate-[0deg] transiton-all duration-[300ms]`}


          //  className={`flip-card mx-auto -rotate-[28deg] w-[256px] h-[167.5px] hover:w-[502px] hover:h-[325px] ease-in-out hover:rotate-[0deg] transiton-all duration-[300ms] hover:-translate-y-[22%] border border-blue-500 ${isCardHovered ? 'card-transform border border-red-500' : ''}`}

        style={{
          // perspective: '2000px',
          // transformStyle: 'preserve-3d',
        }}

          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}


      >
          <div 
            className="flip-card-inner"
          style={{
            transform: `rotateY(${isCardFlipped ? '-180deg' : 0})`
          }}
        >
            <div
              className="flip-card-front drop-shadow-xl hover:rounded-[1.8rem] rounded-[.9rem] transition-all duration-[300ms] ease-in-out"
              onClick={() => setIsCardFlipped(!isCardFlipped)}
            >
              <img src={visitcardA} alt="Visitenkarte A" />
            </div>
            <div 
              className="flip-card-back drop-shadow-xl rounded-[1.8rem] transition-all duration-[300ms] ease-in-out"
              onClick={() => setIsCardFlipped(!isCardFlipped)}
            >
              <img src={visitcardB} alt="Visitenkarte B" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // const [flip, setFlip] = useState<boolean>(false);


  // return (
  //   <div
  //     className="flex relative justify-center"
  //     style={{
  //       // transform: `${flip ? 'rotateY(180deg)' : 'rotateY(0deg)'}}`,
  //     }}
  //   >
  //     <div
  //       className={`w-[600px] h-[350px] mx-auto my-10  rounded-[30px] shadow-[0_0_5px_2px_rgba(0,0,0,0.5)] transition-all duration-150 ${flip ? 'flip' : ''}`}
  //       onClick={() => setFlip(!flip)}
  //       style={{
  //         transform: `${flip ? 'rotateY(180deg)' : 'rotateY(0deg)'}}`,
  //         transformStyle: 'preserve-3d',
  //       }}
  //     >
  //       <div
  //         className="front absolute"
  //         style={{
  //           backfaceVisibility: 'hidden',
  //           transform: `${flip ? 'rotateY(180deg)' : 'rotateY(0deg)'}`
  //         }}
  //       >
  //         FRONT
  //       </div>
  //       <div
  //         className="back absolute"
  //         style={{
  //           backfaceVisibility: 'hidden',
  //           transform: `${!flip ? 'rotateY(180deg)' : 'rotateY(0deg)'}`
  //         }}
  //       >
  //         BACK
  //       </div>
  //       {/* {!flip ? 'front' : 'back'} */}
  //     </div>
  //   </div>
  // );
};

export default BusinessCard;