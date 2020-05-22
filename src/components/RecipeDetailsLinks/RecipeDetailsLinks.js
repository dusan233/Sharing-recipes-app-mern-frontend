import React from "react";

import { FaRegHeart } from "react-icons/fa";
import { IoIosShare, IoIosDownload } from "react-icons/io";
import { IconContext } from "react-icons";

const RecipeDetailsLinks = ({
  creator,
  addFavourites,
  favRecipes,
  recId,
  pdfRecipe,
  recName,
  token,
}) => {
  let heartIcon = (
    <div title="Add to favourites" className="recipe_details_icon_wrap">
      <IconContext.Provider
        value={{
          className: "recipe_details_icon",
        }}
      >
        <FaRegHeart onClick={addFavourites} />
      </IconContext.Provider>
    </div>
  );
  if (token) {
    favRecipes.forEach((rec) => {
      if (recId.toString() === rec._id.toString()) {
        heartIcon = (
          <div
            title="Remove from favourites"
            className="recipe_details_icon_wrap recipe_details_icon_wrap-liked"
          >
            <IconContext.Provider
              value={{
                className: "recipe_details_icon",
                color: "white",
              }}
            >
              <FaRegHeart onClick={addFavourites} />
            </IconContext.Provider>
          </div>
        );
      }
    });
  }

  return (
    <div className="recipe_details_links">
      <div className="recipe_details_creator">
        By <span>{creator}</span>
      </div>
      <div className="icons">
        {heartIcon}
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="twitter-share-button"
          href={`https://twitter.com/intent/tweet?text=${
            "Check this amazing recipe " + process.env.REACT_APP_BACKEND_URL
          }`}
        >
          <div title="share recipe" className="recipe_details_icon_wrap">
            <IconContext.Provider
              value={{
                className: "recipe_details_icon",
                color: "#f3d13a",
              }}
            >
              <IoIosShare />
            </IconContext.Provider>
          </div>
        </a>
        <a
          onClick={() => {
            pdfRecipe.save(`${recName}.pdf`);
          }}
        >
          <div title="download recipe" className="recipe_details_icon_wrap">
            <IconContext.Provider
              value={{
                className: "recipe_details_icon",
                color: "#524fe9",
              }}
            >
              <IoIosDownload />
            </IconContext.Provider>
          </div>
        </a>
      </div>
    </div>
  );
};

export default RecipeDetailsLinks;
