import { useState } from 'react';
import './App.css';
import CvTree from './component/CvTree';

function App() {

  const colors = ['#eee', '#111'];

  const bgColor = colors[1];
  const textColor = colors[0
  ];
  const body = document.querySelector('body') as HTMLElement;

  body.style.backgroundColor = bgColor;
  body.style.color = textColor;

  return (
    <div className="App">
      <CvTree
        bgColor={bgColor}
        textColor={textColor}
      />
    </div>
  );
}

export default App;
