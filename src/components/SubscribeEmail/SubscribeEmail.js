import React from "react";

const SubscribeEmail = () => {
  return (
    <div className="subscribe">
      <h1>Get the best new recipes straight in your inbox.</h1>
      <input
        className="subscribe_input"
        type="text"
        placeholder="Your email address"
      />
      <button className="subscribe_btn">Subscribe</button>
    </div>
  );
};

export default SubscribeEmail;
