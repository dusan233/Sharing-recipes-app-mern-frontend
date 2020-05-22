import React, { Component } from "react";

import { Link } from "react-router-dom";
import { IoMdPerson, IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { IconContext } from "react-icons";
import Spinner from "../../components/Spinner/Spinner";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import * as action from "../../store/index";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
    };
  }

  componentDidMount() {
    this.props.clearAuthEverything();
  }

  onChangeInput = e => {
    const inputName = e.target.name;
    this.setState({
      [inputName]: e.target.value
    });
  };
  render() {
    let { validationError, redirect, isAuth } = this.props;

    if (isAuth) {
      return <Redirect to="/" />;
    }

    if (redirect) {
      return <Redirect to="/login" />;
    }

    return (
      <React.Fragment>
        <div className="form">
          <h3 className="form_text">
            Sign Up and Start Cooking delicious meals!
          </h3>
          <div
            className="validation_errors"
            style={{ display: validationError ? "block" : "none" }}
          >
            {validationError ? validationError.msg : null}
          </div>
          <div className="input_container">
            <IconContext.Provider value={{ className: "form_icon" }}>
              <div className="form_icon_container">
                <IoMdPerson />
              </div>
            </IconContext.Provider>
            <input
              onChange={e => {
                this.onChangeInput(e);
              }}
              className="form_input"
              type="text"
              placeholder="Full Name"
              name="username"
              required
              value={this.state.username}
            />
          </div>
          <div className="input_container">
            <IconContext.Provider value={{ className: "form_icon" }}>
              <div className="form_icon_container">
                <IoMdMail />
              </div>
            </IconContext.Provider>
            <input
              onChange={e => {
                this.onChangeInput(e);
              }}
              className="form_input"
              type="email"
              placeholder="Email"
              name="email"
              required
              value={this.state.email}
            />
          </div>
          <div className="input_container">
            <IconContext.Provider value={{ className: "form_icon" }}>
              <div className="form_icon_container">
                <FaLock />
              </div>
            </IconContext.Provider>
            <input
              onChange={e => {
                this.onChangeInput(e);
              }}
              className="form_input"
              type="password"
              placeholder="Password"
              name="password"
              required
              value={this.state.password}
            />
          </div>
          <button
            onClick={() => {
              this.props.signUp(
                this.state.username,
                this.state.email,
                this.state.password
              );
            }}
            type="submit"
            className="form_submit"
            disabled={this.props.loading ? true : false}
          >
            {this.props.loading ? <Spinner /> : "Sign Up"}
          </button>
          <p className="form_discleimer">
            By signing up you agree to our <span>Terms of use</span> and{" "}
            <span>Privacy Policy</span>
          </p>

          <h4>
            Already have an account?
            <Link
              className="form_redirect"
              to={{
                pathname: "/login"
              }}
            >
              Log In
            </Link>
          </h4>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    validationError: state.auth.signinErrors,
    isAuth: state.auth.token,
    redirect: state.auth.redirect
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: (username, email, password) =>
      dispatch(action.SignUp(username, email, password)),
    clearAuthEverything: () => dispatch(action.clearAuthEverything())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
