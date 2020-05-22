import React from "react";

import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { IconContext } from "react-icons";

class RecipeDetailsGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImage: null,
    };
  }

  changeActiveImage = (img) => {
    this.setState({ activeImage: img });
  };

  render() {
    let count = 0;

    let rateSum = this.props.reviews
      ? this.props.reviews.reduce((sum, add) => {
          count++;
          return sum + add.rate;
        }, 0)
      : 0;

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
            <IconContext.Provider key={i} value={{ color: "white" }}>
              <IoIosStar />
            </IconContext.Provider>
          );
        } else if (i === rateRedcued) {
          stars.push(
            <IconContext.Provider key={i} value={{ color: "white" }}>
              <IoIosStarHalf />
            </IconContext.Provider>
          );
        } else {
          stars.push(
            <IconContext.Provider key={i} value={{ color: "white" }}>
              <IoIosStarOutline />
            </IconContext.Provider>
          );
        }
      }
    } else {
      for (let i = 1; i < 6; i++) {
        if (i <= rateRedcued) {
          stars.push(
            <IconContext.Provider key={i} value={{ color: "white" }}>
              <IoIosStar />
            </IconContext.Provider>
          );
        } else {
          stars.push(
            <IconContext.Provider key={i} value={{ color: "white" }}>
              <IoIosStarOutline />
            </IconContext.Provider>
          );
        }
      }
    }

    return (
      <div className="recipe_details_image_gallery">
        <div
          style={{
            backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/${this.props.activeImage})`,
          }}
          className="recipe_details_active_image"
        >
          <div className="recipe_details_image_overlay">
            <div title={`Average rating of ${avarageRate}`} className="rate">
              {stars} <span>{avarageRate ? avarageRate : 0}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeDetailsGallery;
