import React from "react";

import { IconContext } from "react-icons";
import { IoMdAdd } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";

import withMemo from "../../hoc/withMemo";

const AddRecipeTags = React.forwardRef((props, ref) => {
  return (
    <div className="recipe_form">
      <div className="recipe_form-decor">Tags</div>

      <div className="recipe_form_ingredient_input">
        <span className="form_numer">
          <IconContext.Provider value={{ fontSize: "20px" }}>
            <IoMdAdd />
          </IconContext.Provider>
        </span>
        <input ref={ref} type="text" placeholder="Enter tag" />
      </div>
      <div className="recipe_form_tags">
        {props.tags.map((tag, i) => {
          return (
            <div key={i} className="recipe_form_tag">
              {tag}{" "}
              <IconContext.Provider value={{ className: "delete_ingredient" }}>
                <TiDeleteOutline
                  onClick={() => {
                    props.deleteTag(tag);
                  }}
                />
              </IconContext.Provider>{" "}
            </div>
          );
        })}
      </div>
      <div
        className="empty_ingredient_error"
        style={{
          display: props.valError && props.valError.tags ? "block" : "none"
        }}
      >
        {props.valError ? props.valError.tags : null}
      </div>
      <div
        className="empty_ingredient_error"
        style={{ display: props.validationError ? "block" : "none" }}
      >
        {props.validationError ? props.validationError : null}
      </div>
      <button onClick={props.addTag} className="form_add_ingredient">
        +Add Tag
      </button>
    </div>
  );
});

export default withMemo(AddRecipeTags);
