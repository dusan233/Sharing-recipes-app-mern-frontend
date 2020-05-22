import React from "react";

import withMemo from "../../hoc/withMemo";

const AddRecipeImages = props => {
  return (
    <div className="recipe_form">
      <div className="recipe_form-decor">Image</div>
      <label className="recipe_form_upload_label" htmlFor="filer">
        Choose Image
      </label>
      <input
        className="recipe_form_upload_file"
        id="filer"
        type="file"
        onChange={e => {
          props.addImage(e);
        }}
      />

      <div
        className="empty_ingredient_error"
        style={{
          display: props.valError && props.valError.images ? "block" : "none"
        }}
      >
        {props.valError ? props.valError.images : null}
      </div>

      <div className="recipe_form_preview_images">
        {props.recipeImages.map((img, i) => {
          return (
            <div
              key={i}
              style={{ backgroundImage: `url('${img}')` }}
              className="recipe_form_preview_image"
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default withMemo(AddRecipeImages);
