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
      className={`h-[800px] -mt-[200px] -translate-y-[300px] pt-[400px] pb-[250px]`}
      id="businesscard"
    >
      <div 
      // className={`w-[430px] h-[300px] mx-auto p-32 ease-in-out transiton-all duration-[300ms] ${!isCardHovered ? 'stacks-transform border border-red-500' : ''}`}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      >
        <div
          className={`mt-[100px] flip-card mx-auto md:-rotate-[28deg] w-[350px] h-[232px] md:hover:w-[502px] md:hover:h-[325px] ease-in-out md:hover:rotate-[0deg] md:hover:-translate-y-[90px] transiton-all duration-[1200ms]`}


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
            transform: `rotateX(${!isCardHovered ? !isCardFlipped ? '25deg' : '20deg' : 0}) rotateY(${isCardFlipped ? '-180deg' : 0}) `,
            // transformStyle: 'preserve-3d',
          }}
        >
            <div
              className={`flip-card-front ${isCardHovered ? 'drop-shadow-xl' : 'drop-shadow-sm'} md:hover:rounded-[1.8rem] rounded-[.9rem] transition-all duration-[1500ms] ease-in-out`}
              onClick={() => setIsCardFlipped(!isCardFlipped)}
            >
              <img src={visitcardA} alt="Visitenkarte A" />
            </div>
            <div 
              className={`flip-card-back ${isCardHovered ? 'drop-shadow-xl' : 'drop-shadow-sm'} rounded-[.9rem] transition-all duration-[1500ms] ease-in-out`}
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