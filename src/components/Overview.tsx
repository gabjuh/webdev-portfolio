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
      <div className="container mx-auto py-5 my-16">

        {/* Projects */}
        <h2 className="text-2xl mb-8">Projekte</h2>
        {itProjectItems.map((item, index) => {
          return (
            <div key={index} className="flex flex-wrap">
              {/* Texts */}
              <div className="relative xl:text-right text-center xl:w-[50%] mx-auto xl:mx-0 mb-8">
                <div className="xl:absolute xl:top-[50%] xl:right-[3rem] xl:-translate-y-[50%] max-w-[800px]">
                  <div className="mb-5 text-[#eee] font-bold bg-gradient-to-r from-[#eee] xl:via-[#eee] xl:to-[#2ea18c] via-[#2ea18c] to-[#eee]">
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
              <div className="max-w-[500px] mx-auto">
                <img src={images.filter(img => img.name === item.content.image)[0].img} alt={item.content.slug} />
              </div>
            </div>
          );
        })}

        {/* Schools */}
        <div className="my-52">
          <h2 className="text-2xl">Schulen und Kurse im Bereich IT</h2>
          <table id="schools-table" className="table w-[100%]">
            {itSchoolItems.map((item, index) => {
              return (
                <>
                  <tr className="h-[4rem]">
                    <td className="">
                      <p className="mx-4">{item.content.year}{item.content.end ? ' - ' + item.content.end : ''}</p>
                    </td>
                    <td className="">
                      <p className="font-semibold">{item.content.name}</p>
                      <p className="text-[.85rem] italic">{item.content.institute}</p>
                    </td>
                    <td className="font-semibold italic">
                      {item.content.certificate &&
                        <button className="btn-sm btn-accent rounded-md">Zertifikat</button>
                      }
                    </td>
                  </tr>

                </>

              );

            })}
          </table>
        </div>
      </div>
    </>
  );
};

export default Overview;