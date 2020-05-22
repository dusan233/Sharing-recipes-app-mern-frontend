import React from "react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IconContext } from "react-icons";

const RecursiveReactItems = ({ links, toggleDropdown }) => {
  return links.map((link) => {
    if (link.innerDropdown)
      return (
        <li key={link.text} className="user_dropdown_item">
          {link.text}
          <IconContext.Provider
            value={{
              className: "dropdownIcon",
            }}
          >
            <IoIosArrowForward />
          </IconContext.Provider>

          <DropdownMenu
            toggleDropdown={toggleDropdown}
            links={link.innerDropdown}
          />
        </li>
      );

    return (
      <li key={link.text} className="user_dropdown_item">
        <Link
          onClick={toggleDropdown}
          className="user_dropdown_link"
          to={{
            pathname: link.path,
            search: link.query,
            state: {
              fromDropdown: true,
            },
          }}
        >
          {link.text}
        </Link>
      </li>
    );
  });
};

export default RecursiveReactItems;
