import React from "react";

import logo from "../../assets/logo.png";

import { Link } from "react-router-dom";

const SideBar = props => {
  const sidebarClasses = props.active ? "sidebar sidebar_active" : "sidebar";

  return (
    <div className={sidebarClasses}>
      <div className="sidebar_img_cont">
        <img src={logo} alt="" />
      </div>
      <ul className="sidebar_navigation">
        <li className="sidebar_item">
          <Link
            onClick={props.closeSidebar}
            className="sidebra_link"
            to={{
              pathname: "/"
            }}
          >
            Home
          </Link>
        </li>
        <li className="sidebar_item">
          <Link
            onClick={props.closeSidebar}
            className="sidebra_link"
            to={{
              pathname: "/recipes"
            }}
          >
            Recipes
          </Link>
        </li>
        <li className="sidebar_item">
          <Link
            onClick={props.closeSidebar}
            className="sidebra_link"
            to={{
              pathname: "/create-recipe"
            }}
          >
            Upload Recipe
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
