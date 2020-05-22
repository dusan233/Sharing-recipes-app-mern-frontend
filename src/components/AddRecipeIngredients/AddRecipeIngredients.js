import React from "react";

import { IoMdAdd } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import { IconContext } from "react-icons";

import withMemo from "../../hoc/withMemo";

const AddRecipeIngredients = React.forwardRef((props, ref) => {
  return (
    <div className="recipe_form">
      <div className="recipe_form-decor">Ingredients</div>
      {props.ingredients.map((ing, i) => {
        return (
          <div key={i} className="recipe_form_ingredient">
            <span className="form_numer">{i + 1}</span>
            <div className="recipe_form_ingredient_text">{ing}</div>
            <IconContext.Provider value={{ className: "delete_ingredient" }}>
              <TiDeleteOutline
                onClick={() => {
                  props.deleteIngredient(ing);
                }}
              />
            </IconContext.Provider>
          </div>
        );
      })}

      <div className="recipe_form_ingredient_input">
        <span className="form_numer">
          <IconContext.Provider value={{ fontSize: "20px" }}>
            <IoMdAdd />
          </IconContext.Provider>
        </span>
        <input ref={ref} type="text" placeholder="Enter ingredient" />
      </div>
      <div
        className="empty_ingredient_error"
        style={{
          display:
            props.valError && props.valError.ingredients ? "block" : "none"
        }}
      >
        {props.valError ? props.valError.ingredients : null}
      </div>
      <div
        className="empty_ingredient_error"
        style={{ display: props.validationError ? "block" : "none" }}
      >
        {props.validationError ? props.validationError : null}
      </div>
      <button onClick={props.addIngredient} className="form_add_ingredient">
        +Add Ingredient
      </button>
    </div>
  );
});

export default withMemo(AddRecipeIngredients);
