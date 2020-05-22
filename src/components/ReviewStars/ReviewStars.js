import React from "react";

import { IoIosStar } from "react-icons/io";
import { IconContext } from "react-icons";

const ReviewStart = ({ rate, changeRate }) => {
  let stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < rate) {
      let star = (
        <IconContext.Provider
          key={i}
          value={{ className: "review_star review_star_rated" }}
        >
          <IoIosStar
            onClick={() => {
              changeRate(i + 1);
            }}
          />
        </IconContext.Provider>
      );
      stars.push(star);
    } else {
      let star = (
        <IconContext.Provider key={i} value={{ className: "review_star" }}>
          <IoIosStar
            onClick={() => {
              changeRate(i + 1);
            }}
          />
        </IconContext.Provider>
      );
      stars.push(star);
    }
  }

  return <div className="review_stars">{stars}</div>;
};

export default ReviewStart;
