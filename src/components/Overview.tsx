import React from 'react';
import raw_data from '../data/cv/cv_gj2.json';
import { ITree, IGeneral, IItem, IPoint, IContent, ITimeline } from '../interfaces/Tree';
import ICategories from '../interfaces/Categories';
import images from '../data/tree/images';


const Overview = () => {

  const data = raw_data as ITree;

  const items: IItem[] = data.items;

  const sortedItems: IItem[] = items.sort((a, b) => b.content.year - a.content.year);

  const itSchoolItems: IItem[] = sortedItems.filter((item) => item.content.categories?.includes('it') && item.content.categories?.includes('education'));

  const itProjectItems: IItem[] = sortedItems.filter((item) => item.content.categories?.includes('it') && item.content.categories?.includes('project'));

  console.log(itProjectItems);

  return (
    <>
      <div className="container mx-auto py-5 my-32">
        <h2 className="text-2xl mb-8">Projekte</h2>
        {itProjectItems.map((item, index) => {
          return (
            <div key={index} className="flex flex-row">
              {/* Texts */}
              <div className="relative flex-row text-right w-3/5">
                <div className="absolute top-[50%] right-[3rem] -translate-y-[50%]">
                  <div className="mb-5 text-[#eee] font-bold bg-gradient-to-r from-[#eee] via-[#eee] to-[#2ea18c] to-90%">
                    <p className="mr-2">{item.content.year}</p>
                  </div>
                  <div className="text-2xl font-semibold italic">
                    <p>{item.content.name}</p>
                  </div>
                  <div className="text-2xl font-semibold italic">
                    <p>{item.content.institute}</p>
                  </div>
                  <div className="my-4 text-[#0009] font-extralight">
                    <p>{item.content.description}</p>
                  </div>
                  <div className="">
                    <span className="">{item.content.tech?.map((tech: string) => <div className="inline-block ml-2 text-[#eee] bg-[#555] px-2 rounded-xl text-sm">{tech}</div>)}</span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="max-w-[500px]">
                <img src={images.filter(img => img.name === item.content.image)[0].img} alt={item.content.slug} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Overview;