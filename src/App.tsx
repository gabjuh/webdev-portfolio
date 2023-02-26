import { useState } from 'react';
import './App.css';
import CvTree from './component/CvTree';

function App() {

  const bgColor = '#333';
  const body = document.querySelector('body') as HTMLElement;

  body.style.backgroundColor = bgColor;

  return (
    <div className="App">
      <CvTree
        bgColor={bgColor}
      />
    </div>
  );
}

export default App;
