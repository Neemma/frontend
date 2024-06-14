import React from "react";
import "./LeftSidebar.css";
import { NavLink } from "react-router-dom";
import Globe from "../../assets/Globe.svg";

const LeftSidebar = () => {

  return (
    <div className="left-sidebar">
      <nav className="side-nav">
        <button className="nav-btn">
          <NavLink to="/" className="side-nav-links" activeclassname="active">
            <p>Home</p>
          </NavLink>
        </button>
        <div className="side-nav-div">
          <button  className="nav-btn">
            <NavLink
              to="/Questions"
              className="side-nav-links"
              activeclassname="active"
            >
              <p> Questions </p>
            </NavLink>
          </button>
          <button  className="nav-btn">
            <NavLink
              to="/Tags"
              className="side-nav-links"
              activeclassname="active"
            >
              <p>Tags</p>
            </NavLink>
          </button>
        
          <button  className="nav-btn">
            <NavLink
              to="/Users"
              className="side-nav-links"
              activeclassname="active"
          
            >
              <p>LeaderBoard</p>
            </NavLink>
          </button>

          <button  className="nav-btn">
            <NavLink
              to="/Bookmarks"
              className="side-nav-links"
              activeclassname="active"
            >
              <p>Bookmarks</p>
            </NavLink>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
