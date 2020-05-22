import React from "react";

import { Link } from "react-router-dom";

const BestRatedCard = ({ image, title, cookingTime, creator, recId }) => {
  return (
    <div className="best_rated_card">
      <div className="best_rated_card_img-cont">
        <Link
          to={{
            pathname: `/recipe/${recId}`
          }}
        >
          <img src={image} alt="" />
        </Link>
      </div>
      <div className="best_rated_card_content">
        <h1 className="best_rated_card_heading">{title}</h1>
        <div className="wrap">
          <div className="wraper">
            <div className="best_rated_card_creator">by {creator}</div>
            <div className="best_rated_card_cooking-time">{cookingTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestRatedCard;
