import React, { Component } from "react";

import { Link, Redirect } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { IconContext } from "react-icons";
import Spinner from "../../components/Spinner/Spinner";
import TestAccount from "../../components/TestAccount/TestAccount";

import { connect } from "react-redux";
import * as action from "../../store/index";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
    };
  }

  componentDidMount() {
    this.props.clearAuthEverything();
  }

  onChangeInput = (e) => {
    const inputName = e.target.name;
    this.setState({
      [inputName]: e.target.value,
    });
  };

  render() {
    let { loading, validationError, isAuth } = this.props;

    if (
      isAuth &&
      this.props.location.state &&
      this.props.location.state.from === "/create-recipe"
    ) {
      return <Redirect to="/create-recipe" />;
    }

    if (isAuth) {
      return <Redirect to="/" />;
    }

    return (
      <React.Fragment>
        <TestAccount />
        <div className="form" style={{ marginTop: "50px" }}>
          <h3 className="form_text">Log In to your cooking account!</h3>
          <div
            className="validation_errors"
            style={{ display: validationError ? "block" : "none" }}
          >
            {validationError ? validationError.msg : null}
          </div>
          <div className="input_container">
            <IconContext.Provider value={{ className: "form_icon" }}>
              <div className="form_icon_container">
                <IoMdMail />
              </div>
            </IconContext.Provider>
            <input
              className="form_input"
              type="email"
              onChange={(e) => {
                this.onChangeInput(e);
              }}
              placeholder="Email"
              name="email"
              value={this.state.email}
              required
            />
          </div>
          <div className="input_container">
            <IconContext.Provider value={{ className: "form_icon" }}>
              <div className="form_icon_container">
                <FaLock />
              </div>
            </IconContext.Provider>
            <input
              className="form_input"
              type="password"
              onChange={(e) => {
                this.onChangeInput(e);
              }}
              name="password"
              placeholder="Password"
              required
              value={this.state.password}
            />
          </div>
          <button
            onClick={() => {
              this.props.login(this.state.email, this.state.password);
            }}
            type="submit"
            className="form_submit"
            disabled={loading}
          >
            {this.props.loading ? <Spinner /> : "Log In"}
          </button>
          <p className="form_discleimer">
            or{" "}
            <Link
              to={{
                pathname: "/dassa",
              }}
              className="form_redirect"
            >
              Forgot password
            </Link>
          </p>
          <h4>
            Dont have an Account?
            <Link
              className="form_redirect"
              to={{
                pathname: "/signup",
              }}
            >
              Sign Up
            </Link>
          </h4>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    validationError: state.auth.loginErrors,
    isAuth: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) =>
      dispatch(action.LogIn(email, password, action.setUserData)),
    clearAuthEverything: () => dispatch(action.clearAuthEverything()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
