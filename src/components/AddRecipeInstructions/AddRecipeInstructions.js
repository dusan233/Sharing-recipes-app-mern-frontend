import React from "react";

import { IoMdAdd } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import { IconContext } from "react-icons";

import withMemo from "../../hoc/withMemo";

const AddRecipeInstructions = React.forwardRef((props, ref) => {
  return (
    <div className="recipe_form">
      <div className="recipe_form-decor">Instructions</div>
      {props.instructions.map((ins, i) => {
        return (
          <div key={i} className="recipe_form_instruction">
            <span className="form_numer">{i + 1}</span>
            <p className="recipe_form_instruction_text">{ins}</p>
            <IconContext.Provider value={{ className: "delete_ingredient" }}>
              <TiDeleteOutline
                onClick={() => {
                  props.deleteInstruction(ins);
                }}
              />
            </IconContext.Provider>
          </div>
        );
      })}
      <div className="recipe_form_instructions_input">
        <span className="form_numer">
          <IconContext.Provider value={{ fontSize: "20px" }}>
            <IoMdAdd />
          </IconContext.Provider>
        </span>
        <textarea
          ref={ref}
          name=""
          placeholder="Enter instruction"
          id=""
          cols="30"
          rows="6"
        ></textarea>
      </div>
      <div
        className="empty_ingredient_error"
        style={{
          display:
            props.valError && props.valError.instructions ? "block" : "none"
        }}
      >
        {props.valError ? props.valError.instructions : null}
      </div>
      <div
        className="empty_ingredient_error"
        style={{ display: props.validationError ? "block" : "none" }}
      >
        {props.validationError ? props.validationError : null}
      </div>
      <button onClick={props.addInstruction} className="form_add_ingredient">
        +Add Instruction
      </button>
    </div>
  );
});

export default withMemo(AddRecipeInstructions);
