import { useState } from 'react';
import './App.css';
import CvTree from './components/CvTree';
import Nav from './components/Nav';
// import Buttons from './components/Buttons';
import Stack from './components/Stack';
import Footer from './components/Footer';
import Projects from './components/Projects';

const scrollToId = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

function App() {

  const colors = ['#eee', '#000'];

  const bgColor = colors[0];
  const textColor = colors[1];

  const body = document.querySelector('body') as HTMLElement;

  body.style.backgroundColor = bgColor;
  body.style.color = textColor;

  return (
    <div className="App">
      <div className=" z-0">
        <Stack
          scrollToId={scrollToId}
        />

        {/* <Buttons
        // categories={categories}
        /> */}
        <CvTree
          bgColor={bgColor}
          textColor={textColor}
          scrollToId={scrollToId}
        />
        {/* <Projects /> */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
