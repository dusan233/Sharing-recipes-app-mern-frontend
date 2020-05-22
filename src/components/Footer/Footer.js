import React from "react";
import { withRouter } from "react-router-dom";

class Footer extends React.Component {
  render() {
    if (this.props.location.pathname === "/create-recipe") return null;
    return (
      <footer>
        <h1>Developed By Dusan Jovanovic 2020</h1>
      </footer>
    );
  }
}

export default withRouter(Footer);
