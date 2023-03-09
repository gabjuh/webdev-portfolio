import { useState } from 'react';
import './App.css';
import CvTree from './component/CvTree';
import Nav from './component/Nav';
import Hero from './component/Hero';
import Stack from './component/Stack';
import Footer from './component/Footer';
import Projects from './component/Projects';

function App() {

  const colors = ['#eee', '#000'];

  const bgColor = colors[0];
  const textColor = colors[1];

  const body = document.querySelector('body') as HTMLElement;

  body.style.backgroundColor = bgColor;
  body.style.color = textColor;

  return (
    <div className="App overflow-hidden">
      <Nav />
      <div className=" z-0">
        {/* <Hero /> */}
        <Stack />
        <CvTree
          bgColor={bgColor}
          textColor={textColor}
        />
        <Projects />
        <Footer />
      </div>
    </div>
  );
}

export default App;
