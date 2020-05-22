import React from "react";

import defaultUser from "../../assets/default-user-image.png";

const UserHero = ({ username, headline }) => {
  return (
    <div className="user-hero">
      <div className="user-profile_image">
        <div className="user_image_cont">
          <img src={defaultUser} alt="" />
        </div>
        <h2 className="user-username">{username}</h2>
      </div>
      <div className="user-bio">{headline || "This is headline."}</div>
    </div>
  );
};

export default UserHero;
