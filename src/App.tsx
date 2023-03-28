import React from 'react';
import './App.css';
import CvTree from './components/CvTree';
import Stack from './components/Stack';
import Footer from './components/Footer';
import Chat from './components/Chat';

function App() {
  return (
    <div className="App">
      <div className="z-0">
        <Stack />
        <CvTree />
        <Chat />
        <Footer />
      </div>
    </div>
  );
}

export default App;
