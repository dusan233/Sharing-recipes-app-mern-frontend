import React, { Component } from "react";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IconContext } from "react-icons";

import DropdownMenu from "../DropdownMenu/DropdownMenu";

class DropdownNavLink extends Component {
  state = {
    userDropdown: false
  };
  dropdownRef = React.createRef();

  componentDidMount() {
    window.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = e => {
    if (!this.dropdownRef.current.contains(e.target)) {
      if (this.state.userDropdown) {
        this.setState({ userDropdown: false });
      }
    }
  };

  toggleDropdown = () => {
    this.setState(prevState => ({
      userDropdown: !prevState.userDropdown
    }));
  };

  render() {
    return (
      <div ref={this.dropdownRef} className="user_card">
        <span onClick={this.toggleDropdown} className="nav_link ">
          {this.props.text}{" "}
          {this.state.userDropdown ? (
            <IconContext.Provider
              value={{
                className: "dropdownIcon"
              }}
            >
              <IoIosArrowDown />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider
              value={{
                className: "dropdownIcon"
              }}
            >
              <IoIosArrowUp />
            </IconContext.Provider>
          )}
        </span>
        <div
          className={
            this.state.userDropdown
              ? "user_dropdown_first  active"
              : "user_dropdown_first"
          }
        >
          <DropdownMenu
            first={true}
            toggleDropdown={this.toggleDropdown}
            links={this.props.links}
          />
        </div>
      </div>
    );
  }
}

export default DropdownNavLink;
