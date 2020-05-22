import React from "react";

import RecursiveDropItems from "../RecursiveDropItems/RecursiveDropItems";

const DropdownMenu = ({ links, toggleDropdown, first }) => {
  return (
    <div className={first ? "user_dropdown_prvi" : "user_dropdown_inner"}>
      <ul className="user_dropdown_navigation">
        <RecursiveDropItems toggleDropdown={toggleDropdown} links={links} />
      </ul>
    </div>
  );
};

export default DropdownMenu;
