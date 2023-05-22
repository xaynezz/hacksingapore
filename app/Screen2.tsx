import React from 'react';
import '@/public/landingpage.css';
const Screen2Component = () => (
  <div className="screen screen2 " >
    <h1>Screen 2</h1>
    <p>This is the content of Screen 2.</p>
    <a href="/login" className="mt-5 h-8 w-64 rounded-xl bg-secondarydark-500 font-semibold text-white active:bg-secondarydark-400 flex justify-center items-center">
      Let's get started!
    </a>
  </div>
);

export default Screen2Component;