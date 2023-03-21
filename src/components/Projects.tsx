import React from 'react';
import Project from './Project';
import Fragment from 'react';

const projects = [
  {
    title: 'Puzzle',
    description: 'This \'Push Puzzle\' game has been created in React. Different difficulty levels can be chosen, the images can be changed during the game, and for help you can blend in the numbers.',
    stack: ['React', 'JS', 'CSS'],
    img: "puzzle"
  },
  {
    title: 'Tommy\'s Chords',
    description: 'This is a chord finder app. It is possible to search for chords by name, and the chords can be played by clicking on the chord. The app is created in React.',
    stack: ['React', 'TypeScript', 'Tailwind'],
    img: "tommyschords"
  }
];

const Projects = () => {
  return (
    <div className="mx-auto md:w-[100%] text-center grid md:grid-cols-2 -translate-y-[70px] mb-32">
      {projects.map((project, index) => (
        <Project
          key={index}
          title={project.title}
          description={project.description}
          stack={project.stack}
          img={project.img}
        />
      ))}
    </div>
  );
};

export default Projects;