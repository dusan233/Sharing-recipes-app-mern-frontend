import React from "react";

import { IconContext } from "react-icons";
import { IoIosStar } from "react-icons/io";

const ReactReviews = ({ reviews }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <ul className="recipe_details_reviews_list">
      <h3>Reviews ({reviews ? reviews.length : "0"}):</h3>
      {reviews && reviews.length > 0 ? (
        reviews.map(rev => {
          return (
            <li key={rev._id} className="recipe_details_reviews_item">
              <div className="recipe_details_reviews_item_cont">
                <div className="rate">
                  {stars.map(star => {
                    if (star <= rev.rate) {
                      return (
                        <IconContext.Provider
                          key={star}
                          value={{ color: "orange" }}
                        >
                          <IoIosStar />
                        </IconContext.Provider>
                      );
                    } else {
                      return (
                        <IconContext.Provider
                          key={star}
                          value={{ color: "black" }}
                        >
                          <IoIosStar />
                        </IconContext.Provider>
                      );
                    }
                  })}
                </div>
                <div className="recipe_details_reviews_item_creator">
                  {rev.creatorUsername}
                </div>
              </div>
              <div className="recipe_details_reviews_item_date">
                {rev.createdAt.slice(0, 10)}
              </div>
              <div className="recipe_details_reviews_item_comment">
                {rev.comment}
              </div>
            </li>
          );
        })
      ) : (
        <h3>No reviews for this recipe yet.</h3>
      )}
    </ul>
  );
};

export default ReactReviews;
