import React from "react";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  IoMdTime,
  IoIosStar,
  IoIosStarHalf,
  IoIosStarOutline
} from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { IconContext } from "react-icons";

import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const RecipeCard = props => {
  let count = 0;

  const rateSum = props.reviews.reduce((sum, add) => {
    count++;
    return sum + add.rate;
  }, 0);

  let stars = [];

  let avarageRate = (rateSum / count).toFixed(1);

  if (avarageRate === "NaN") {
    avarageRate = 0;
  }

  const rateRedcued = Math.round(avarageRate);

  if (rateRedcued > avarageRate) {
    for (let i = 1; i < 6; i++) {
      if (i < rateRedcued) {
        stars.push(
          <IconContext.Provider key={i} value={{ color: "orange" }}>
            <IoIosStar />
          </IconContext.Provider>
        );
      } else if (i === rateRedcued) {
        stars.push(
          <IconContext.Provider key={i} value={{ color: "orange" }}>
            <IoIosStarHalf />
          </IconContext.Provider>
        );
      } else {
        stars.push(
          <IconContext.Provider key={i} value={{ color: "orange" }}>
            <IoIosStarOutline />
          </IconContext.Provider>
        );
      }
    }
  } else {
    for (let i = 1; i < 6; i++) {
      if (i <= rateRedcued) {
        stars.push(
          <IconContext.Provider key={i} value={{ color: "orange" }}>
            <IoIosStar />
          </IconContext.Provider>
        );
      } else {
        stars.push(
          <IconContext.Provider key={i} value={{ color: "orange" }}>
            <IoIosStarOutline />
          </IconContext.Provider>
        );
      }
    }
  }

  let heartIcon = (
    <div className="favourite">
      <IconContext.Provider
        value={{ color: "white", className: "recipe_like" }}
      >
        <FaRegHeart title="Add to Favourites" onClick={props.addToFav} />
      </IconContext.Provider>
    </div>
  );

  props.favRecipes.forEach(recipe => {
    if (props.recId.toString() === recipe._id.toString()) {
      heartIcon = (
        <div className="favourite">
          <IconContext.Provider
            value={{ className: "recipe_like_red recipe_like" }}
          >
            <FaHeart title="Remove from Favourites" onClick={props.addToFav} />
          </IconContext.Provider>
        </div>
      );
    }
  });

  let conty;

  if (props.loading) {
    if (props.currentRec) {
      if (props.currentRec.toString() === props.recId.toString()) {
        conty = (
          <div className="favourite">
            <Spinner recCard />
          </div>
        );
      } else {
        conty = heartIcon;
      }
    }
  } else {
    conty = heartIcon;
  }

  return (
    <div className="recipe_card">
      <div
        style={{ backgroundImage: `url(${props.imgUrl})` }}
        className="recipe_img_container"
      >
        <div className="recipe_overlay">
          {props.created ? (
            <div className="delete_recipe">
              <IconContext.Provider
                value={{ color: "white", className: "recipe_like" }}
              >
                <MdDeleteForever
                  title="Delete Recipe"
                  onClick={props.openDelRecModal}
                />
              </IconContext.Provider>
            </div>
          ) : null}
          {conty}
        </div>
      </div>
      <div className="recipe_content">
        <div className="recipe_creator">By {props.creator}</div>
        <h3 className="recipe_title">{props.title}</h3>
        <div className="rating">
          <div className="rate">
            {stars}
            <span className="recipe_average_rate">{avarageRate}</span>
          </div>
          <div className="cook_time">
            <span>
              <IconContext.Provider value={{ className: "cooking_time_icon" }}>
                <IoMdTime />
              </IconContext.Provider>
            </span>
            <span>{props.cookingTime}</span>
          </div>
        </div>
        <Link
          className="view_recipe"
          to={{
            pathname: `/recipe/${props.recId}`
          }}
        >
          View Recipe
        </Link>
      </div>
      {props.new ? <div className="recipe_card_new">New</div> : null}
    </div>
  );
};

export default RecipeCard;
