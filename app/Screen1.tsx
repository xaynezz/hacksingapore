import React from 'react';
import { Link } from 'react-router-dom';

const Screen1Component = () => (
  <div className="screen" style={{ backgroundImage: 'url(/backgroundmainblur.jpg)' }}>

      <div className="header-text">Welcome to EdiPlants!</div>
      
      <a href="/login" className="mt-5 h-8 w-64 rounded-xl bg-secondarydark-500 font-semibold text-white active:bg-secondarydark-400 flex justify-center items-center">
        Let's get started!
      </a>

  </div>
);

export default Screen1Component;