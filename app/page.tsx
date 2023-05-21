"use client" 
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import {SwipeableScreens, NavigationDots} from '@/components/LandingPageScreens';
import Screen1Component from './Screen1';
import Screen2Component from './Screen2';
import Screen3Component from './Screen3';



const App = () => (
  <Router>
    <div className="app">
      <SwipeableScreens>
        <Routes>
          <Route path="/" element={<Screen1Component />} />
          <Route path="/screen2" element={<Screen2Component />} />
          <Route path="/screen3" element={<Screen3Component />} />
        </Routes>
      </SwipeableScreens>
      <NavigationDots />
    </div>
  </Router>
);

export default App;
