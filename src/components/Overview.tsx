import React from 'react';
import raw_data from '../data/cv/cv_gj2.json';
import { ITree, IGeneral, IItem, IPoint, IContent, ITimeline } from '../interfaces/Tree';
import ICategories from '../interfaces/Categories';

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
              <div className="flex-row text-right">
                <div className="">
                  <p>{item.content.year}</p>
                </div>
                <div className="">
                  <p>{item.content.name}</p>
                </div>
                <div className="">
                  <p>{item.content.institute}</p>
                </div>
                <div className="">
                  <p>{item.content.description}</p>
                </div>
                <div className="">
                  <span className="">{item.content.tech?.map((tech: string) => <div className="inline-block ml-2">{tech}</div>)}</span>
                </div>
                <img src="" alt="" />

              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Overview;