import { useState } from 'react';
import './App.css';
import CvTree from './components/CvTree';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Stack from './components/Stack';
import Footer from './components/Footer';
import Projects from './components/Projects';

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
