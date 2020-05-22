import React from "react";

import errorImage from "../../assets/Screenshot_10.png";

const PageNotFound = props => {
  return (
    <div className="page_not_found">
      <div className="error_page_cont">
        <span className="error_page_number">4</span>
        <div className="error_page_img_cont">
          <img className="error_page_img" src={errorImage} alt="" />
        </div>
        <span className="error_page_number">4</span>
      </div>
      <h2>Oops...Page Not Found</h2>
      <p>The page you are looking for doesn't seem to exist</p>
    </div>
  );
};

export default PageNotFound;
