import React from 'react';
import { Routes, Route } from 'react-router';
import './App.css';
import CvTree from './components/CvTree';
import Stack from './components/Stack';
import Footer from './components/Footer';
import Chat from './components/Chat';
import Hero from './components/Hero';
import Credits from './components/Credits/Credits';
import Impressum from './components/Impressum';
import BusinessCard from './components/BusinessCard';
import ScrollProgressBar from './components/ScrollProgressBar';
import Overview from './components/Overview';
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
