import React from "react";

import ChangePassword from "./ChangePassword";

import { connect } from "react-redux";
import * as actionCreator from "../../store/index";

const UpdateAccount = ({
  changePassword,
  changingPassword,
  userId,
  token,
  changePassErrors,
}) => {
  return (
    <div className="user-tabpanel">
      <div className="user-tabpanel-heading">
        <h2>Account</h2>
        <p>Edit your account settings and change your password here.</p>
      </div>

      <ChangePassword
        changePassword={changePassword}
        changingPassword={changingPassword}
        userId={userId}
        token={token}
        errors={changePassErrors}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  changingPassword: state.changePassword.changingPassword,
  userId: state.auth.userId,
  token: state.auth.token,
  changePassErrors: state.changePassword.errors,
});

const mapDispatchToProps = {
  changePassword: actionCreator.changePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAccount);
