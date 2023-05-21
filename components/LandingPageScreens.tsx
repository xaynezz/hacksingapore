import React from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import '@/public/landingpage.css';

export const SwipeableScreens = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const childrenArray = React.Children.toArray(children);
  const index = childrenArray.findIndex((child) => child.props.path === location.pathname);

  const handleChangeIndex = (index) => {
    navigate(childrenArray[index].props.path);
  };

  return (
    <SwipeableViews index={index} onChangeIndex={handleChangeIndex} resistance enableMouseEvents>
      {children}
    </SwipeableViews>
  );
};

export const NavigationDots = () => {
  const location = useLocation();

  const isActive = (match, location) => {
    if (!match) {
      return false;
    }

    return match.url === location.pathname;
  };

  return (
    <div className="navigation-dots">
      <NavLink to="/" className="dot" isActive={isActive}>
        {<div>ASS</div>}
      </NavLink>
      <NavLink to="/screen2" className="dot" isActive={isActive}>
        {/* dot content */}
      </NavLink>
      <NavLink to="/screen3" className="dot" isActive={isActive}>
        {/* dot content */}
      </NavLink>
    </div>
  );
};