import React from 'react';
import data from '../../data/credits/credits';
import { ICredits } from '../../interfaces/credits';

// Set data in alphabetical order
data.sort((a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
});

const Credits = () => {
  return (
    <div className="container max-w-[800px] mx-auto min-h-[80vh]">
      <h2 className="text-2xl mt-[2rem]">Credits</h2>
      <h2 className="text-xl mt-[2rem]">Logos</h2>

      {data.map((item, index) => {

        const {
          name, nameLink, author, authorLink, uploader,
          uploaderLink, license, licenseLink, changes
        }: ICredits = item;

        const origin = author ? 'Created' : 'Uploaded';
        const nameOf = author ? author : uploader;
        const linkOf = author ? authorLink : uploaderLink;

        return (
          <div key={index} className="my-5 bg-[#ddd] p-4 rounded-md">
            <h3 className="font-[600]"><a href={nameLink} target="_blank">{name}</a>:</h3>
            <p className="text mt-[0.5rem]">{origin} by
              <span className="font-[600]">
                <a href={linkOf} target="_blank"> {nameOf}</a>
              </span>, licensed under
              <span className="font-[600]">
                <a href={licenseLink} target="_blank"> {license}</a>
              </span>.
            </p>
            <p className="">Changes made: {changes}.</p>
          </div>
        );
      })}
    </div>
  );
};

export default Credits;