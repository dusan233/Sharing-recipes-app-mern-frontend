import React from "react";

import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { FaRegUserCircle, FaUserCog } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { IconContext } from "react-icons";

import recipeDropdownLinks from "./recipesDropdownLinks";
import DropdownNavLink from "../DropdownNavLink/DropdownNavLink";

const Navbar = React.forwardRef((props, ref) => {
  return (
    <div ref={ref.refTwo} className="nav">
      <div className="nav_navigation">
        <div className="nav_container">
          <div className="nav_container_part1">
            <Link
              className="nav_link "
              to={{
                pathname: "/",
              }}
            >
              Home
            </Link>
            <DropdownNavLink links={recipeDropdownLinks} text="Recipes" />
            <Link
              className=" nav_link--red-two"
              to={{
                pathname: "/create-recipe",
              }}
            >
              Upload Recipe
            </Link>
          </div>
          <div className="nav_container_img">
            <img src={logo} alt="" />
          </div>
          <div className="nav_container_part2">
            {!props.isAuth ? (
              <React.Fragment>
                {" "}
                <Link
                  className=" nav_link--red"
                  to={{
                    pathname: "/login",
                  }}
                >
                  Login
                </Link>
                <Link
                  className=" nav_link--red signup_link"
                  to={{
                    pathname: "/signup",
                  }}
                >
                  Signup
                </Link>{" "}
                <span className="burger_menu">
                  <IconContext.Provider
                    value={{ className: "burger_menu_icon" }}
                  >
                    <GiHamburgerMenu onClick={props.toogleSideBar} />
                  </IconContext.Provider>
                </span>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div ref={ref.refOne} className="user_card">
                  <IconContext.Provider value={{ className: "user_icon" }}>
                    <FaRegUserCircle onClick={props.toogleUserDropdown} />
                  </IconContext.Provider>
                  <div
                    className={
                      props.userDropdown
                        ? "user_dropdown  active"
                        : "user_dropdown"
                    }
                  >
                    <div className="icon_wrap">
                      <IconContext.Provider
                        value={{ className: "user_icon_red" }}
                      >
                        <FaRegUserCircle />
                      </IconContext.Provider>
                      <h4>{props.username}</h4>
                    </div>
                    <ul className="user_dropdown_navigation">
                      <li className="user_dropdown_item">
                        <IconContext.Provider
                          value={{ className: "small_icons" }}
                        >
                          <FaUserCog />
                        </IconContext.Provider>
                        <Link
                          onClick={props.toogleUserDropdown}
                          className="user_dropdown_link"
                          to={{
                            pathname: "/user/profile",
                          }}
                        >
                          Profile
                        </Link>
                      </li>
                      <li className="user_dropdown_item">
                        <IconContext.Provider
                          value={{ className: "small_icons" }}
                        >
                          <IoIosCreate />
                        </IconContext.Provider>
                        <Link
                          onClick={props.toogleUserDropdown}
                          className="user_dropdown_link"
                          to={{
                            pathname: "/user/recipes",
                          }}
                        >
                          Created Recipes
                        </Link>
                      </li>
                      <li className="user_dropdown_item">
                        <IconContext.Provider
                          value={{ className: "small_icons" }}
                        >
                          <FaHeart />
                        </IconContext.Provider>
                        <Link
                          onClick={props.toogleUserDropdown}
                          className="user_dropdown_link"
                          to={{
                            pathname: "/user/recipes/favourites",
                          }}
                        >
                          Favourite Recipes
                        </Link>
                      </li>
                    </ul>
                    <div className="line"></div>
                    <ul className="user_dropdown_navigation">
                      <li className="user_dropdown_item">
                        <IconContext.Provider
                          value={{ className: "small_icons" }}
                        >
                          <FaUserCog />
                        </IconContext.Provider>
                        <span
                          onClick={() => {
                            props.toogleUserDropdown();
                            props.logout();
                          }}
                          style={{ display: "inline-block", width: "100%" }}
                        >
                          Logout
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <button
                  onClick={props.logout}
                  className=" nav_link--red logout_link"
                >
                  Log Out
                </button>
                <span className="burger_menu">
                  <IconContext.Provider
                    value={{ className: "burger_menu_icon" }}
                  >
                    <GiHamburgerMenu onClick={props.toogleSideBar} />
                  </IconContext.Provider>
                </span>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Navbar;
