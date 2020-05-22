import React, { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "password":
      return {
        ...state,
        password: action.password,
      };
    case "newPassword":
      return {
        ...state,
        newPassword: action.newPassword,
      };
    case "confirmNewPassword":
      return {
        ...state,
        confirmNewPassword: action.confirmNewPassword,
      };
    case "cleanInputs":
      return {
        password: "",
        newPassword: "",
        confirmNewPassword: "",
      };
    default:
      return state;
  }
};

const ChangePassword = ({
  changePassword,
  userId,
  token,
  changingPassword,
  errors,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const changeUserPassword = () => {
    changePassword(
      state.password,
      state.newPassword,
      state.confirmNewPassword,
      userId,
      token
    ).then((data) => {
      if (!data.errorData) {
        dispatch({ type: "cleanInputs" });
      }
    });
  };

  const onChangeInput = (e) => {
    dispatch({
      type: e.target.name,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="wrap_form_control">
      <div
        className="empty_ingredient_error"
        style={{
          display: errors && errors.password ? "block" : "none",
        }}
      >
        {errors && errors.password}
      </div>
      <div className="recipe_form_control">
        <input
          onChange={onChangeInput}
          className="recipe_form_input"
          name="password"
          id="password"
          value={state.password}
          type="text"
          placeholder="Enter current password"
        />
      </div>
      <div
        className="empty_ingredient_error"
        style={{
          display: errors && errors.newPassword ? "block" : "none",
        }}
      >
        {errors && errors.newPassword}
      </div>
      <div className="recipe_form_control">
        <input
          onChange={onChangeInput}
          className="recipe_form_input"
          name="newPassword"
          id="newPassword"
          value={state.newPassword}
          type="text"
          placeholder="Enter new password"
        />
      </div>
      <div
        className="empty_ingredient_error"
        style={{
          display: errors && errors.confirmedNewPassword ? "block" : "none",
        }}
      >
        {errors && errors.confirmedNewPassword}
      </div>
      <div className="recipe_form_control">
        <input
          onChange={onChangeInput}
          className="recipe_form_input"
          name="confirmNewPassword"
          id="confirmNewPassword"
          value={state.confirmNewPassword}
          type="text"
          placeholder="Re-type new password"
        />
      </div>

      <button
        disabled={changingPassword}
        onClick={changeUserPassword}
        className="clasic-btn"
      >
        {changingPassword ? "Loading..." : "Change Password"}
      </button>
    </div>
  );
};

export default ChangePassword;
