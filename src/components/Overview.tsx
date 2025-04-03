import React, { useEffect, useState } from 'react';

import newTabIcon from '../assets/logos/new-tab_mc.svg';
import icons from '../data/overview/icons';
import raw_projects_data from '../data/overview/projects.json';
import raw_schools_data from '../data/overview/schools.json';
import pdfs from '../data/pdfs/pdfs';
import images from '../data/tree/images';
import { scrollToId } from '../helpers/pageNavigation';
import { IItem, IProjectInTable, ITree } from '../interfaces/Tree';
import Title from './Title';

const Overview = () => {

  const schools_data = raw_schools_data as ITree;
  const projects_data = raw_projects_data as unknown as ITree;

  const items_schools: IItem[] = schools_data.items;
  const items_projects: IItem[] = projects_data.items;

  const sortedSchoolItems: IItem[] = items_schools.sort((a, b) => b.content.year - a.content.year);
  const sortedProjectItems: IItem[] = items_projects.sort((a, b) => b.content.year - a.content.year);

  const itSchoolItems: IItem[] = sortedSchoolItems.filter((item) =>
    item.content.categories?.includes('it') 
    // && item.content.categories?.includes('education')
  );

  const itProjectItems: IItem[] = sortedProjectItems.filter((item) =>
    item.content.categories?.includes('it') &&
    item.content.categories?.includes('project')
  );

  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  const projectLimit = 3;

  const handleOnclickMoreProjectsButton = () => {
    setIsProjectsOpen(!isProjectsOpen);
  };

  // useEffect(() => {
  //   if (!isProjectsOpen) {
  //     scrollToId('projects');
  //   }
  // }, [isProjectsOpen])

  return (
    <>
      <div className="container mx-auto py-5 mt-16" id="projects">

        {/* Projects */}
        <Title text="Projekte" level={3} />
        {itProjectItems.map((item, index) => {
          if (index >= projectLimit && !isProjectsOpen) {
            return;
          }

          return (
            <div className="mb-32" key={`projects-${index}`} >
              <div className="flex flex-wrap">
              {/* Texts */}
                <div className="relative xl:text-right text-center xl:w-[55%] mx-auto xl:mx-0 mb-8 max-w-[100%]">
                <div className="xl:absolute xl:top-[50%] xl:right-[3rem] xl:-translate-y-[50%] max-w-[800px]">
                    <div className="inline-block py-2 mb-5 w-[350px] xl:w-[500px] mx-auto max-w-[100%] xl:mx-0 text-[#eee] font-bold bg-gradient-to-r from-[#eee] xl:via-[#eee] xl:to-[#2ea18c] via-[#2ea18c] to-[#eee]">
                      <p className="mr-2">
                        {item.content.year}{item.content.end ? typeof item.content.end === 'string' && item.content.end === ' ' ? ' bis heute' : ' - ' + item.content.end : ''}
                      </p>
                    </div>

                    {/* Name */}
                    <div className="text-2xl font-semibold">
                    <p>{item.content.name}</p>
                  </div>

                    {/* Institute */}
                    <div className="text-xl mt-2 italic">
                    <p>{item.content.institute}</p>
                  </div>

                    {/* Description */}
                    <div className="my-4 text-[#0009] font-extralight md:max-w-[70%] mx-auto xl:mx-0 xl:max-w-[100%]">
                    <p>{item.content.description}</p>
                  </div>

                    {/* Tech */}
                  <div className="">
                    <span className="">{item.content.tech?.map((tech: string, index: number) => <div key={`project-tech-${index}`} className="inline-block ml-2 text-[#eee] bg-[#555] px-2 rounded-xl text-sm">{tech}</div>)}</span>
                  </div>

                    {/* Buttons on Desktop */}
                    <div className="text-right mt-7 hidden xl:block">
                      {/* Play button */}
                      {item.content.gameLink &&
                        <a className="btn btn-outline btn-accent ml-2" href={item.content.gameLink} target="_blank">Play</a>
                      }
                      {/* Normal link */}
                      {item.content.link &&
                        <a className="btn btn-outline btn-accent ml-2" href={item.content.link} target="_blank">Visit</a>
                      }
                      {/* Github link */}
                      {item.content.githubLink &&
                        <a className="btn btn-outline btn-accent ml-2" href={item.content.githubLink} target="_blank">Github</a>
                      }
                    </div>
                </div>
              </div>

              {/* Image */}
                <div className="max-w-[540px] mx-auto xl:mx-0">
                  {item.content.image2 ?
                    <div className="group xl:h-[470px] sm:h-[370px] h-[250px] sm:w-[600px] xs:w-[350px] w-[300px] relative xl:pt-9" id="projects-with-two-images">
                      <img className="lg:max-h-[350px] sm:max-w-[510px] -translate-y-0 absolute md:group-hover:-translate-y-[70px] md:group-hover:-translate-x-[20px] transition-all ease-in-out duration-500" src={images.filter(img => img.name === item.content.image2)[0]?.img} alt={item.content.slug} />
                      <img className="lg:max-h-[350px] sm:max-w-[510px] sm:translate-y-[60px] translate-y-[30px] sm:translate-x-[40px] translate-x-[20px] absolute md:group-hover:translate-y-[130px] md:group-hover:translate-x-[90px] transition-all ease-in-out duration-500" src={images.filter(img => img.name === item.content.image)[0]?.img} alt={item.content.slug} />
                    </div>
                    :
                    <img className="max-h-[500px] xl:-translate-y-4" src={images.filter(img => img.name === item.content.image)[0]?.img} alt={item.content.slug} />
                  }
                </div>
              </div>

              {/* Buttons on mobile */}
              <div className="text-center mt-7 xl:hidden">
                {/* Play button */}
                {item.content.gameLink &&
                  <a className="btn btn-outline btn-accent mx-2" href={item.content.gameLink} target="_blank">Play</a>
                }
                {/* Normal link */}
                {item.content.link &&
                  <a className="btn btn-outline btn-accent mx-2" href={item.content.link} target="_blank">Visit</a>
                }
                {/* Github link */}
                {item.content.githubLink &&
                  <a className="btn btn-outline btn-accent mx-2" href={item.content.githubLink} target="_blank">Github</a>
                }
              </div>
            </div>
          );
        })}

        <button id="toggleProjectsButton" className="btn btn-accent btn-sm mx-auto block" onClick={handleOnclickMoreProjectsButton}>{isProjectsOpen ? 'Weniger' : 'Mehr'} anzeigen</button>


        {/* Schools */}
        <div className="my-52 pt-5" id="schools">
          <Title text="IT-Jobs und Ausbildung" level={3} />

          {/* On Desktop */}
          <table className="hidden lg:block w-[80%] text-left text-sm font-light mx-auto">
            <tbody>
              {itSchoolItems.map((item, index) => {

                return (
                  <tr key={`schools-tr-${index}`} className={`border-b ${index % 2 ? 'bg-[#eee]' : 'bg-[#ddd5]'}`}>
                    {/* Job/School Icos */}
                    <td className="w-[80px] h-[50px] align-top whitespace-nowrap px-6 pt-8 font-semibold">
                      {item.content.categories.includes('job') && 
                        <img className="w-10 h-10 translate-y-[-12px]" src={icons.find((icon) => icon.name === 'Job')?.img} alt="job icon" title="Job" />
                      }
                      {item.content.categories.includes('education') && 
                      <img className="w-9 h-9 translate-y-[-9px]" src={icons.find((icon) => icon.name === 'School')?.img} alt="job icon" title="Schulung" />}
                    </td>

                    {/* Years */}
                    <td className="align-top whitespace-nowrap pt-8 py-4 font-semibold">
                      {item.content.year}{item.content.end ? typeof item.content.end === 'string' && item.content.end === ' ' ? ' bis heute' : ' - ' + item.content.end : ''}
                    </td>

                    {/* Icon */}
                    <td className="align-top whitespace-nowrap px-8 pt-7 min-w-[170px]">
                      {item.content.icons?.map((icon: string, index: number) => {
                        const ico = icons.filter(i => i.name === icon);
                        return (
                          <React.Fragment key={`icon-${index}`}>
                            {ico ?
                              <img src={ico[0]?.img} alt={ico[0]?.name} className="inline-block w-auto h-7 pr-1" title={item.content.icons ? item.content.icons[index] : ''} />
                              : ''}
                          </React.Fragment>
                        );
                      }
                      )}
                    </td>

                    <td className="align-top whitespace-nowrap px-8 py-6">
                      {/* Kursname */}
                      <span className="block font-semibold">
                        {item.content.name}
                      </span>

                      {/* Institute */}
                      <span className="inline-block text-[.85rem] italic whitespace-pre-wrap lg:max-w-[90%]">
                        {item.content.institute}
                      </span>

                      {/* Projects */}
                      {item.projects && 
                        <>
                          <p className="font-bold mt-2">Projekte:</p>
                          <ul className="cursor-default">
                            {item.projects.map((project: IProjectInTable, index: number) => (
                              <li className="relative group list-disc mt-1 ml-10" key={index}>
                                {project.url ? (
                                  <a target="_blank" href={project.url}>
                                  {project.name} 
                                  <img className="w-5 h-auto inline-block ml-2 translate-y-[-2px]" src={newTabIcon} alt="Open in new Tab" />
                                </a>
                                ): (
                                  project.name
                                )}
                                <div className="absolute inline z-[100] group-hover:visible invisible w-[300px]">
                                  {project.stack.map((s: string, index: number) => (
                                    <span className="inline text-white bg-slate-400 rounded-full px-2 py-0.1 mx-0.5 text-xs" key={index}>{s}</span>
                                  ))}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </>
                      }
                    </td>

                    {/* Certificate button */}
                    <td className="align-top whitespace-nowrap px-6 pt-8">
                      {item.content.certificate && !item.content.certificate?.includes('abitur') &&
                        <a
                          href={item.content.certificate ? pdfs.find(pdf => pdf.id === item.content.certificate)?.url : ''}
                          className="btn-sm btn-accent py-1 rounded font-normal transition-all duration-300"
                          target="_blank"
                          title="Zertifikat herunterladen"
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
                  <div key={`schools-mobile-${index}`} className="md:w-[50%] min-w-[250px] px-3 py-10 mb-10">
                    {/* Icons */}
                    <div className="border-b-2 border-accent pb-2 mb-2">
                      {item.content.icons?.map((icon: string, index: number) => {
                        const ico = icons.filter(i => i.name === icon);
                        return (
                          <React.Fragment key={`icon-mobile-${index}`}>
                            {ico ?
                              <img src={ico[0]?.img} alt={ico[0]?.name} className="inline-block w-10 h-10 mx-2" />
                              : ''}
                          </React.Fragment>
                        );
                      }
                      )}
                    </div>

                    {/* Year */}
                    <p className="text-md font-semibold">{item.content.year}{item.content.end ? typeof item.content.end === 'string' && item.content.end === ' ' ? ' bis heute' : ' - ' + item.content.end : ''}</p>

                    {/* Name */}
                    <p className="text-2xl font-semibold my-2">{item.content.name}</p>

                    {/* Institute */}
                    <p className="text-[.85rem] font-extralight italic max-w-[60%] mx-auto">{item.content.institute}</p>

                    {/* Certificate button */}
                    {item.content.certificate &&
                      <button className="btn-sm btn-accent rounded-md mt-5">Zertifikat</button>
                    }
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