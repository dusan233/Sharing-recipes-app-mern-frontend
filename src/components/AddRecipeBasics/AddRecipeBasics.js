import React from "react";

import { GiFruitBowl, GiChefToque } from "react-icons/gi";
import { IconContext } from "react-icons";
import { IoMdStopwatch, IoMdPerson } from "react-icons/io";
import { GoBook } from "react-icons/go";

import withMemo from "../../hoc/withMemo";

const AddRecipeBasics = props => {
  return (
    <div className="recipe_form">
      <div className="recipe_form-decor">Recipe Basics</div>
      <IconContext.Provider value={{ className: "recipe_form_icon" }}>
        <GiFruitBowl />
      </IconContext.Provider>
      <label className="recipe_form_label" htmlFor="title">
        Title
      </label>
      <div
        className="empty_ingredient_error"
        style={{
          display: props.valError && props.valError.title ? "block" : "none"
        }}
      >
        {props.valError ? props.valError.title : null}
      </div>
      <div className="recipe_form_control">
        <input
          onChange={props.changeInputHandler}
          className="recipe_form_input"
          name="title"
          id="title"
          type="text"
          value={props.title}
        />
      </div>
      <div className="recipe_form_select_control_label">
        <div className="recipe_form_label_wrap">
          <IconContext.Provider value={{ className: "recipe_form_icon" }}>
            <IoMdPerson />
          </IconContext.Provider>
          <label className="recipe_form_label" htmlFor="serves">
            Serves
          </label>
        </div>
        <div className="recipe_form_label_wrap">
          <IconContext.Provider value={{ className: "recipe_form_icon" }}>
            <IoMdStopwatch />
          </IconContext.Provider>
          <label className="recipe_form_label" htmlFor="cookingTime">
            Cooking Time
          </label>
        </div>
        <div className="recipe_form_label_wrap">
          <IconContext.Provider value={{ className: "recipe_form_icon" }}>
            <GiChefToque />
          </IconContext.Provider>
          <label className="recipe_form_label" htmlFor="difficulty">
            Diffuculty
          </label>
        </div>
      </div>

      <div className="recipe_form_select_control">
        <select
          className="recipe_form_input recipe_form_select"
          name="serve"
          id="serve"
          value={props.serve}
          onChange={props.changeInputHandler}
        >
          <option defaultValue value="2 Persons">
            2 Persons
          </option>
          <option value="3 Persons">3 Persons</option>
          <option value="4 Persons">4 Persons</option>
        </select>
        <select
          className="recipe_form_input recipe_form_select"
          name="cookingTime"
          id="cookingTime"
          value={props.cookingTime}
          onChange={props.changeInputHandler}
        >
          <option defaultValue value="0-20 minutes">
            0-20 minutes
          </option>
          <option value="20-30 minutes">20-30 minutes</option>
          <option value="30-50 minutes">30-50 minutes</option>
          <option value="50+ minutes">50+ minutes</option>
        </select>
        <select
          className="recipe_form_input recipe_form_select"
          name="difficulty"
          id="difficulty"
          value={props.difficulty}
          onChange={props.changeInputHandler}
        >
          <option defaultValue value="easy">
            easy
          </option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
      </div>
      <div className="recipe_form_select_control_label">
        <div className="recipe_form_label_wrap">
          <label className="recipe_form_label" htmlFor="category">
            Category
          </label>
        </div>
        <div className="recipe_form_label_wrap">
          <label className="recipe_form_label" htmlFor="course">
            Course
          </label>
        </div>
      </div>
      <div className="recipe_form_select_control">
        <select
          className="recipe_form_input recipe_form_select"
          name="category"
          id="category"
          value={props.category}
          onChange={props.changeInputHandler}
        >
          <option defaultValue value="cakes">
            cakes
          </option>
          <option value="drinks">drinks</option>
          <option value="pizza">pizza</option>
          <option value="pasta">pasta</option>
          <option value="salad">salad</option>
          <option value="soup">soup</option>
          <option value="other">other</option>
        </select>
        <select
          className="recipe_form_input recipe_form_select"
          name="course"
          id="course"
          value={props.course}
          onChange={props.changeInputHandler}
        >
          <option defaultValue value="breakfast">
            breakfast
          </option>
          <option value="lunch">lunch</option>
          <option value="dinner">dinner</option>
          <option value="appetizer">appetizer</option>
          <option value="desert">desert</option>
        </select>
      </div>
      <IconContext.Provider value={{ className: "recipe_form_icon" }}>
        <GoBook />
      </IconContext.Provider>
      <label className="recipe_form_label" htmlFor="description">
        Description
      </label>
      <div
        className="empty_ingredient_error"
        style={{
          display:
            props.valError && props.valError.description ? "block" : "none"
        }}
      >
        {props.valError ? props.valError.description : null}
      </div>
      <div className="recipe_form_control">
        <textarea
          onChange={props.changeInputHandler}
          className="recipe_form_input"
          name="description"
          id="description"
          cols="30"
          rows="6"
          value={props.description}
        ></textarea>
      </div>
    </div>
  );
};

export default withMemo(AddRecipeBasics);
