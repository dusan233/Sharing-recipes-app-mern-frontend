import React from "react";
import ReactDOM from "react-dom";

const modalCont = document.getElementById("modal");

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    modalCont.appendChild(this.el);
  }

  componentWillUnmount() {
    modalCont.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default Modal;
