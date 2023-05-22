"use client" 
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {NavigationDots} from '@/components/LandingPageScreens';
import Screen1Component from './Screen1';
import Screen2Component from './Screen2';
import Screen3Component from './Screen3';


const App = () => (
  <Router>
    <div className="app">
        <Routes>
          <Route path="/" element={<Screen1Component />} />
          <Route path="/screen2" element={<Screen2Component />} />
          <Route path="/screen3" element={<Screen3Component />} />
        </Routes>
        <div className="button-container">
      </div>
      <NavigationDots />
        
    </div>

  </Router>
);

export default App;
