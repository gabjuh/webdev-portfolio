import React from 'react';
import { Routes, Route } from 'react-router';
import './App.css';
import CvTree from './components/CvTree';
import Stack from './components/Stack';
import Footer from './components/Footer';
import Chat from './components/Chat';
import Credits from './components/Credits/Credits';
import StickyMenu from './components/StickyMenu';

function App() {
  return (
    <>
      <div className="App">
        {/* <StickyMenu /> */}

        <Routes>
          <Route path="/" element={
            <div className="z-0">
              <Stack />
              <CvTree />
              <Chat />
            </div>
          } />
          <Route path="/credits" element={<Credits />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
