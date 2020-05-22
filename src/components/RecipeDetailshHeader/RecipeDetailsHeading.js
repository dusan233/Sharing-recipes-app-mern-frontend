import React from "react";

import { IconContext } from "react-icons";
import { IoMdTime } from "react-icons/io";
import { GiChefToque } from "react-icons/gi";
import { IoMdPerson } from "react-icons/io";

const RecipeDetailsHeading = ({
  title,
  cookingTime,
  serves,
  difficulty,
  description,
  creationDate
}) => {
  return (
    <div className="recipe_details_head_section">
      <div className="head_section_wraper">
        <div className="content">
          <h1>{title}</h1>
          <div className="rating_cook-time">
            <div className="cook_time">
              <span>
                <IconContext.Provider
                  value={{ className: "cooking_time_icon" }}
                >
                  <IoMdTime />
                </IconContext.Provider>
              </span>
              <span>{cookingTime}</span>
            </div>
            <div className="cook_time">
              <span>
                <IconContext.Provider
                  value={{ className: "cooking_time_icon" }}
                >
                  <GiChefToque />
                </IconContext.Provider>
              </span>
              <span>{difficulty}</span>
            </div>
            <div className="cook_time">
              <span>
                <IconContext.Provider
                  value={{ className: "cooking_time_icon" }}
                >
                  <IoMdPerson />
                </IconContext.Provider>
              </span>
              <span>{serves}</span>
            </div>
          </div>

          <div className="recipe_details_description">{description}</div>
          <div className="recipe_details_creation_date">
            Created: {creationDate ? creationDate.slice(0, 10) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsHeading;
