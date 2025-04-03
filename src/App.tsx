import './App.css';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import BusinessCard from './components/BusinessCard';
import Chat from './components/Chat';
import Credits from './components/Credits/Credits';
import CvTree from './components/CvTree';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Impressum from './components/Impressum';
import Overview from './components/Overview';
import ScrollProgressBar from './components/ScrollProgressBar';
import Stack from './components/Stack';
import StickyMenu from './components/StickyMenu';

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <div className="z-0">
              <Hero />
              <StickyMenu />
              <Stack />
              <Overview />
              <BusinessCard />
              <CvTree />
              <Chat />
            </div>
          } />
          <Route path="/credits" element={<Credits />} />
          <Route path="/impressum" element={<Impressum />} />
        </Routes>
        <Footer />
        <ScrollProgressBar />
      </div>
    </>
  );
}

export default App;
