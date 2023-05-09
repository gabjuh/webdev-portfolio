import React from 'react';
// import { images } from './images';

interface IProject {
  key: number;
  title: string;
  description: string;
  stack: string[];
  img: string;
}

const Project: React.FC<IProject> = ({
  key,
  title,
  description,
  stack,
  img
}) => {
  return (
    <>
      {/* img */}
      <div className="md:cols-1">
        {/* <img className="lg:w-[400px]" src={images[img]} alt="" /> */}
      </div>
      <div className="md:cols-1 md:text-left pr-5 my-10">

        {/* Title */}
        <h2 className="text-3xl font-bold">{title}</h2>

        {/* Description */}
        <p className="text-lg text-gray-500 mt-7">
          {description}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-2 mt-4">
          {stack.map((item, index) => (
            <span key={index} className="text-sm bg-gray-200 text-gray-700 rounded-full px-3 py-1">
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Project;