import React from "react";

const Spinner = props => {
  let clasess = props.big ? "loader loader_big" : "loader";

  if (props.page) {
    clasess = "loader page_loader";
  }

  if (props.recCard) {
    clasess = "loader_white";
  }
  return (
    <div
      style={{ color: props.color ? props.color : "white" }}
      className={clasess}
    ></div>
  );
};

export default Spinner;
