import React, { useState } from 'react';
import raw_schools_data from '../data/overview/schools.json';
import raw_projects_data from '../data/overview/projects.json';
import images from '../data/tree/images';
import pdfs from '../data/pdfs/pdfs';

import { ITree, IItem } from '../interfaces/Tree';

const Overview = () => {

  const schools_data = raw_schools_data as ITree;
  const projects_data = raw_projects_data as unknown as ITree;

  const items_schools: IItem[] = schools_data.items;
  const items_projects: IItem[] = projects_data.items;

  const sortedSchoolItems: IItem[] = items_schools.sort((a, b) => b.content.year - a.content.year);

  const itSchoolItems: IItem[] = sortedSchoolItems.filter((item) =>
    item.content.categories?.includes('it') &&
    item.content.categories?.includes('education')
  );

  const itProjectItems: IItem[] = items_projects.filter((item) =>
    item.content.categories?.includes('it') &&
    item.content.categories?.includes('project')
  );

  return (
    <>
      <div className="container mx-auto py-5 my-16">

        {/* Projects */}
        <h2 className="text-2xl mb-8 text-center">Projekte</h2>
        {itProjectItems.map((item, index) => {
          return (
            <div key={`projects-${index}`} className="flex flex-wrap">
              {/* Texts */}
              <div className="relative xl:text-right text-center xl:w-[55%] mx-auto xl:mx-0 mb-8">
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
                    <span className="">{item.content.tech?.map((tech: string, index: number) => <div key={`project-tech-${index}`} className="inline-block ml-2 text-[#eee] bg-[#555] px-2 rounded-xl text-sm">{tech}</div>)}</span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="max-w-[540px] mx-auto">
                <img src={images.filter(img => img.name === item.content.image)[0].img} alt={item.content.slug} />
              </div>
            </div>
          );
        })}

        {/* Schools */}
        <div className="my-52">
          <h2 className="text-2xl mb-8 text-center">IT-Ausbildung und Selbstentwicklung</h2>

          {/* On Desktop */}
          <table className="hidden lg:block w-[80%] text-left text-sm font-light mx-auto">
            <tbody>
              {itSchoolItems.map((item, index) => {

                return (
                  <tr key={`schools-tr-${index}`} className={`border-b ${index % 2 ? 'bg-[#eee]' : 'bg-[#ddd5]'}`}>
                    {/* Years */}
                    <td className="whitespace-nowrap px-6 py-4">
                      {item.content.year}{item.content.end ? typeof item.content.end === 'string' && item.content.end === ' ' ? ' bis heute' : ' - ' + item.content.end : ''}
                    </td>

                    {/* Icon */}
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="block font-semibold">
                        icon
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      {/* Kursname */}
                      <span className="block font-semibold">
                        {item.content.name}
                      </span>

                      {/* Institute */}
                      <span className="inline-block text-[.85rem] italic whitespace-pre-wrap lg:max-w-[90%]">
                        {item.content.institute}
                      </span>
                    </td>

                    {/* Certificate button */}
                    <td className="whitespace-nowrap px-6 py-4">
                      {item.content.certificate && !item.content.certificate?.includes('abitur') &&
                        <a
                          href={item.content.certificate ? pdfs.find(pdf => pdf.id === item.content.certificate)?.url : ''}
                          className="btn-sm btn-accent py-1 rounded font-normal transition-all duration-300"
                          target="_blank"
                        >Zertifikat</a>
                      }
                    </td>
                  </tr>
                );
              })}

            </tbody >
          </table>

          {/* On Mobile */}
          <div className="flex flex-col md:flex-row sm:flex-wrap lg:hidden text-center " >
            {
              itSchoolItems.map((item, index) => {
                return (
                  <div key={`schools-mobile-${index}`} className="md:w-[50%] min-w-[250px] px-3 py-10">
                    <p className="">{item.content.year}{item.content.end ? typeof item.content.end === 'string' && item.content.end === ' ' ? ' bis heute' : ' - ' + item.content.end : ''}</p>
                    <p className="font-semibold">{item.content.name}</p>
                    <p className="text-[.85rem] italic max-w-[60%] mx-auto">{item.content.institute}</p>
                    {item.content.certificate &&
                      <button className="btn-sm btn-accent rounded-md">Zertifikat</button>
                    }
                    <hr className="my-4" />
                  </div>
                );
              })
            }
          </div >
        </div>
      </div>
    </>
  );
};

export default Overview;