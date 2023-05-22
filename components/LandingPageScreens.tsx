import React from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import '@/public/landingpage.css';

export const NavigationDots = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (match, location) => {
    if (!match) {
      return false;
    }
    return match.url === location.pathname;
  };

  const routes = [
    { path: '/'},
    { path: '/screen2',},
    { path: '/screen3'},
    { path: '/screen4'},
    { path: '/screen5'},
    { path: '/screen6'}
  ];

  const handleNavigate = (path) => {
    const currentIndex = routes.findIndex((route) => route.path === location.pathname);
    let newIndex;
    if (path === 'prev') {
      newIndex = currentIndex - 1;
      if (newIndex < 0) {
        newIndex = routes.length - 1;
      }
    } else {
      newIndex = (currentIndex + 1) % routes.length;
    }
    navigate(routes[newIndex].path);
  };

  return (
    <div className="navigation-dots" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", bottom: 10, left: 0, right: 0 }}>
      <div className="arrow left-arrow" onClick={() => handleNavigate('prev')}>
        <span>&lt;</span>
      </div>
      {routes.map((route) => (
        <NavLink key={route.path} to={route.path} className="dot" isActive={isActive}>
          {route.label}
        </NavLink>
      ))}
      <div className="arrow right-arrow" onClick={() => handleNavigate('next')}>
        <span>&gt;</span>
      </div>
    </div>
  );
};
